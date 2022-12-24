import { useNavigation, useIsFocused } from '@react-navigation/native';
import React, { useState, useLayoutEffect } from 'react';
import { View, StyleSheet, FlatList, StatusBar } from 'react-native';
import HeaderUser from '../../components/HeaderUser';
import Product from '../../components/Product';

import api from '../../services/api';

export default function Home() {
  const navigation = useNavigation();
  const focus = useIsFocused()
  const [me, setMe] = useState([]);

  useLayoutEffect(() => {
    async function Me() {
      const response = await api.get('/me');
      setMe(response?.data);
    }

    Me();

  }, [focus]);

  return (

    <View style={styles.container}>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
