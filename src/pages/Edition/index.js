import React, { useEffect, useState, useContext, useLayoutEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

import { AuthContext } from '../../contexts/AuthContext';
import { Picker } from "@react-native-picker/picker";
import { useNavigation, useIsFocused, useRoute } from "@react-navigation/native";

import api from '../../services/api';
import colors from '../../services/colors'

import Feather from 'react-native-vector-icons/Feather'

export default function Edition() {
  const navigation = useNavigation();
  const focus = useIsFocused();
  const route = useRoute()

  const { user } = useContext(AuthContext)

  const [name, setNome] = useState(route.params?.name)
  const [description, setDescription] = useState(route.params?.description)
  const [price, setPrice] = useState(route.params?.price)
  const [off, setOff] = useState(route.params?.off)
  const [size, setSize] = useState("")
  const [color, setColor] = useState("")
  const [selectedPickerCategory, setSelectedPickerCategory] = useState(route.params?.categoryID);
  const [listCategories, setListCategories] = useState([]);

  useEffect(() => {
    async function handleCategoryID() {
      const categories = await api.get("/categories");

      setListCategories(categories?.data);
    }

    handleCategoryID();

  }, []);

  useEffect(() => {
    navigation.setOptions({

      headerRight: () => {
        return (
          <View style={{ flexDirection: 'row' }}>

            <TouchableOpacity
              style={styles.btns_savedelete}
              onPress={() => {
                Update()
              }}>

              <Feather name='save' color='#fff' size={22} />

            </TouchableOpacity>

            <TouchableOpacity
              style={styles.btns_savedelete}
              onPress={() => {
                Delete()
              }}>

              <Feather name='trash' color='#fff' size={22} />

            </TouchableOpacity>

          </View>
        )
      },
    }), [listCategories]
  })

  async function Update() {

    await api.put(`/product?productID=${route.params?.id}`, {
      name,
      description,
      price,
      off,
      size,
      color,
      categoryID: selectedPickerCategory,
      headers: {
        Authorization: `Bearer ${user.token}`,
      }
    })
      .then(() => {
        navigation.navigate('Home', { modal: true, mensagem: 'Produto atualizado!' })
      })

  }

  async function Delete() {

    await api.delete(`/product?productID=${route.params?.id}`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      }
    })
      .then(response => {
        navigation.navigate('Home', { modal: true, mensagem: 'Produto Excluido!' })
      })
  }


  return (
    <View style={styles.container}>
      <ScrollView style={styles.form}>

        {/* Mostrar aqui fotos em formato 'Disabled' apenas como amostra */}

        <TextInput inlineImagePadding={50} inlineImageLeft='cube' placeholder='Nome'
          style={styles.input} value={name} onChangeText={setNome} />

        <TextInput inlineImagePadding={50} inlineImageLeft='text_long' placeholder='Descrição'
          style={styles.input} value={description} multiline={true} onChangeText={setDescription} />

        <TextInput editable={false} inlineImagePadding={50} inlineImageLeft='currency' placeholder='Preço'
          style={styles.input} value={price} onChangeText={setPrice} />

        <TextInput inlineImagePadding={50} inlineImageLeft='tag' placeholder='Oferta'
          keyboardType='number-pad'
          style={styles.input} value={off} onChangeText={setOff} />


        {off > 0 &&
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
              label="Campanha"
              enabled={false}
              style={{ color: "#999", fontSize: 16 }}
            />

          </Picker>
        }

        <TextInput inlineImagePadding={50} inlineImageLeft='size' placeholder='Tamanhos'
          style={styles.input} value={size} onChangeText={setSize} />

        <TextInput inlineImagePadding={50} inlineImageLeft='color' placeholder='Cores'
          style={styles.input} value={color} onChangeText={setColor} />

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

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background_tela,
  },
  form: {
    padding: 20,
    flex: 1
  },
  input: {
    height: 55,
    backgroundColor: colors.background_component,
    marginBottom: 8,
    paddingHorizontal: 15,
    borderRadius: 4,
  },
  picker: {
    backgroundColor: colors.background_component,
    marginBottom: 8,
    borderRadius: 4,
    height: 55,
  },
  btns_savedelete: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    marginLeft: 10,
    borderRadius: 4,
    backgroundColor: colors.one,
  },

})