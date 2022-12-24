import React, { useContext } from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import Feather from 'react-native-vector-icons/Feather'

import { AuthContext } from '../../contexts/AuthContext';

export default function HeaderUser(props) {

  const navigation = useNavigation()

  const { signOut } = useContext(AuthContext);

  return (
    <View style={styles.container_header}>
      <View style={styles.container_avatar}>
        <Image
          style={styles.avatar}
          source={{}}
        />
      </View>

      <View style={styles.data}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 }}>

          <Text ellipsizeMode="tail" numberOfLines={1} style={styles.name}>
            {props.data?.userData?.name}
          </Text>

          <View style={styles.container_btns}>

            <TouchableOpacity
              style={styles.btn}
              onPress={() => navigation.navigate("Add")}>

              <Feather style={styles.ico} name='plus' size={18} color='#333' />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.btn}
              onPress={() => navigation.navigate("Data", props.data?.userData)}>

              <Feather style={styles.ico} name='edit-2' size={18} color='#333' />
            </TouchableOpacity>


            <TouchableOpacity
              style={styles.btn}
              onPress={signOut}>

              <Feather style={styles.ico} name='log-out' size={18} color='#333' />
            </TouchableOpacity>

          </View>

        </View>

        <View style={{ flexDirection: 'row' }}>

          <Text style={styles.active}>
            {props.data?.active && `${props.data?.products.length} produto${props.data?.products.length > 1 ? "s" : ""}`}
          </Text>

          <Text style={{ color: 'green' }}>{props.data?.active ? ' - Online' : 'Loja Desativada'}</Text>

          <TouchableOpacity style={styles.active}>
            <Text>{!props.data?.active && 'Fale Conosco'}</Text>
          </TouchableOpacity>

        </View>

        <Text style={styles.bio} ellipsizeMode="tail" numberOfLines={1}>
          {props.data?.userData?.bio}
        </Text>

      </View>




    </View>
  );
}

const styles = StyleSheet.create({
  container_header: {
    height: 110,
    backgroundColor: '#fff',
    elevation: 3,
    zIndex: 99999,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  container_avatar: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 120,
    marginRight: 15,
    position: 'relative',
  },
  avatar: {
    backgroundColor: '#eee',
    borderRadius: 60 / 2,
    width: 60,
    height: 60,
  },

  container_btns: {
    justifyContent: 'space-between',
    flexDirection: 'row',

    width: 110,
    marginLeft: 30,
  },
  btn: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    width: 30,
  },
  data: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
    color: '#222',
  },
  bio: {
    color: '#999',
    fontSize: 13
  },
  active: {
    color: '#999',
    fontSize: 13
  },
});
