import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, StatusBar } from 'react-native';
import { useNavigation, useIsFocused, useRoute } from '@react-navigation/native';
import api from '../../services/api';

import Loading from '../../components/Loading';
import HeaderUser from '../../components/HeaderUser';
import Product from '../../components/Product';

import Ico from 'react-native-vector-icons/Feather'

import colors from '../../services/colors';

export default function Home() {
  const navigation = useNavigation();
  const focus = useIsFocused()
  const [me, setMe] = useState([]);

  useEffect(() => {

    async function Me() {
      const response = await api.get('/me');

      setMe(response.data);

      navigation.setOptions({
        title: `${response.data?.userData?.name}`,
        headerStyle: {
          backgroundColor: colors.app.base
        },

        headerRight: () => {
          return (
            <View style={{ flexDirection: 'row' }}>

              <TouchableOpacity
                style={styles.btn}
                onPress={() => navigation.navigate("Add")}>

                <Ico style={styles.ico} name='plus' size={20} color='#fff' />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.btn}
                onPress={() => navigation.navigate("Data", me.userData)}>

                <Ico style={styles.ico} name='user' size={20} color='#fff' />
              </TouchableOpacity>


            </View>
          )
        }
      })
    }
    Me()
  }, [focus])


  return (

    <View style={styles.container}>
      <StatusBar backgroundColor={colors.app.base} />
      {!me.products ? <Loading/> :


      <FlatList
      
      data={me.products}
      renderItem={({ item }) => <Product item={item} />}
      numColumns={3}
      ListHeaderComponent={<HeaderUser data={me} />}
      stickyHeaderIndices={[0]}
      stickyHeaderHiddenOnScroll
      keyExtractor={(item) => item.id}
      showsVerticalScrollIndicator={false}
      />
    }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  btn: {
    width: 35,
    height: 50,
    justifyContent:'center',
    alignItems: 'flex-end',
    marginLeft: 15
  }

  
});
