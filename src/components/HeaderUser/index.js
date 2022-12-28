import React, { useContext } from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet, StatusBar, ScrollView } from 'react-native';
import colors from '../../services/colors';

import Ico from 'react-native-vector-icons/Feather'

export default function HeaderUser(props) {

  return (
    <View style={styles.container_header}>
      <ScrollView style={styles.data}
      showsHorizontalScrollIndicator={false}
      horizontal
      >

        <View style={styles.item_data}>

          <View>
            <Text style={[styles.active,{backgroundColor: props.data?.active ? colors.util.dark: colors.util.red}]}>
              {props.data?.active ? "ON" : "OFF"}
            </Text>
          </View>

          <Text style={[styles.txt_item_data, { width: props.data?.active ? 45 : 65}]}>
            {props.data?.active ? `Loja Online` : `Loja Desativada`}
          </Text>

        </View>

        <View style={styles.item_data}>

          <Text style={styles.active}>
            {props.data?.products?.length}
          </Text>

          <Text style={[styles.txt_item_data,{ width: 80}]}>
            produto{props.data?.products?.length > 1 && "s"} cadastrados
          </Text>

        </View>


        {props.data?.userFormat?.delivery &&
        <View style={styles.item_data}>
          <Ico name='truck' size={24} color={colors.util.white} style={{marginRight:10}}/>

          <Text style={[styles.txt_item_data,{ width: 80}]}>
            Sou um Entregador
          </Text>

        </View>
        }

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container_header: {
    height: 50,
    backgroundColor: colors.app.base,
    zIndex: 9999,
    paddingHorizontal: 15,
    paddingBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 5
  },
  container_avatar: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    marginRight: 15,
    position: 'relative',
  },
  avatar: {
    backgroundColor: '#eee',
    borderRadius: 60 / 2,
    width: 50,
    height: 50,
  },
  data: {
    flex: 1,
    flexDirection: 'row'
  },
  bio: {
    color: '#fff',
  },
  item_data:{
    flexDirection: 'row', alignItems: 'center', marginRight: 10,minWidth: 110  
  },
  txt_item_data:{
    color: colors.util.gold, fontSize: 10
  },
  active: {
    color: '#fff',
    fontSize: 26,
    fontWeight: 'bold',
    marginRight: 5
  },
  btn_contato: {
    marginLeft: 5
  }
});
