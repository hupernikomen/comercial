import React, { useEffect, useState, useContext, useLayoutEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, PushNotificationIOS } from 'react-native';

import { useRoute } from '@react-navigation/native';
import { AuthContext } from '../../contexts/AuthContext';
import { Picker } from "@react-native-picker/picker";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import api from '../../services/api';

export default function Edition() {
  const navigation = useNavigation();
  const focus = useIsFocused();
  const { user } = useContext(AuthContext)

  const route = useRoute()


  const [name, setNome] = useState(route.params?.name)
  const [description, setDescription] = useState(route.params?.description)
  const [price, setPrice] = useState(route.params?.price)
  const [off, setOff] = useState(route.params?.off)
  const [size, setSize] = useState("")
  const [color, setColor] = useState("")
  const [selectedPickerCategory, setSelectedPickerCategory] = useState(route.params?.categoryID);
  const [listCategories, setListCategories] = useState([]);

  useLayoutEffect(() => {
    async function handleCategoryID() {
      const categories = await api.get("/categories");

      setListCategories(categories?.data);
    }

    handleCategoryID();

  }, [navigation, focus]);

  navigation.setOptions({
    headerRight:()=>{
      return(
        <TouchableOpacity
      style={styles.btnexcluir}
        onPress={() => {
          Delete()
          navigation.navigate('Home')
        }}>

        <Text style={styles.txtbtnexcluir}>Excluir</Text>
      </TouchableOpacity>
      )
    },
  })

  async function Update() {
    await api.put('/product', {
      name: name,
      description: description,
      price: price,
      off: off,
      size: size,
      color: color,
      categoryID: selectedPickerCategory,
      productID: route.params?.id,
      headers: {
        Authorization: `Bearer ${user.token}`,
      }
    })

  }

  async function Delete() {

    await api.delete(`product?productID=${route.params?.id}`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      }
    })
    .then(response =>{
      alert(response.data.message)
    })


  }


  return (
    <View style={styles.container}>
      <ScrollView style={styles.form}>

        <Text style={[styles.tituloinput, { marginBottom: 25 }]}>
          Obs: Não será possível alterar as imagens do produto.
        </Text>

        <TextInput placeholder='Nome' style={styles.input} value={name} onChangeText={setNome} />
        <TextInput placeholder='Descrição' style={styles.input} value={description} multiline={true} onChangeText={setDescription} />
        <TextInput placeholder='Preço' style={styles.input} value={price} onChangeText={setPrice} />
        <TextInput placeholder='Oferta' style={styles.input} value={off} onChangeText={setOff} />
        <TextInput placeholder='Tamanhos' style={styles.input} value={size} onChangeText={setSize} />
        <TextInput placeholder='Cores' style={styles.input} value={color} onChangeText={setColor} />
        <Picker
          style={styles.picker}
          mode="dropdown"
          selectedValue={selectedPickerCategory}
          onValueChange={(itemValue, itemIndex) => {
            setSelectedPickerCategory(itemValue);
          }}
        >
          <Picker.Item
            key={route.params?.categoryID}
            value="0"
            label="Categoria"
            enabled={false}
            style={{ color: "#999", fontSize: 16 }}
          />

          {listCategories.map((item) => {
            return (
              <Picker.Item
                key={item.id}
                value={item.id}
                label={item.name}
                style={{ fontSize: 16 }}
              />
            );
          })}
        </Picker>


      </ScrollView>

      <TouchableOpacity activeOpacity={.8}
        onPress={() => {
          Update()
          navigation.navigate('Home')
        }
        } style={styles.btncadastrar}>
        <Text style={styles.txtbtn}>Reenviar Produto...</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  form: {
    padding: 15,
    flex: 1
  },
  tituloinput: {
    fontSize: 16,
    paddingHorizontal: 15,
    color: "#222"
  },
  input: {
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    fontSize: 16,
    margin: 2,
    minHeight: 50,
  },
  btncadastrar: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#fff"
  },
  btnexcluir: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#ff0000',
    paddingVertical: 4,
    paddingHorizontal:6,
    borderRadius: 4
  },
  txtbtn: {
    fontSize: 16,
    
  },
  txtbtnexcluir:{
    fontSize: 16,
    color:'#fff'
  },
  picker: {
    backgroundColor: "#fff",
    margin: 2,
    height: 50,
  },
})