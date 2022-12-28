import React, { useState, useContext, useLayoutEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView
} from "react-native";

import api from "../../services/api";

import colors from "../../services/colors";

import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { Picker } from "@react-native-picker/picker";

import { useNavigation, useIsFocused } from "@react-navigation/native";
import { AuthContext } from "../../contexts/AuthContext";

export default function AddProducts() {
  const navigation = useNavigation();
  const focus = useIsFocused()

  const { user } = useContext(AuthContext);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");

  const [listCategories, setListCategories] = useState([]);

  const [selectedPicker, setSelectedPicker] = useState("Categoria");

  const [arrImagesSelect, setArrImagesSelect] = useState([])



  selectFile = () => {

    var options = {
      title: 'Selecione Fotos',
      storageOptions: {
        skipBackup: true,
        path: 'files',
      },
    };

    launchImageLibrary(options, res => {

      if (res.didCancel) {
        console.log('User cancelled image picker');
      } else if (res.error) {
        console.log('ImagePicker Error: ', res.error);
      } else if (res.customButton) {
        console.log('User tapped custom button: ', res.customButton);
        alert(res.customButton);
      } else {
        let source = res;

        setArrImagesSelect(arrImagesSelect => [...arrImagesSelect, source.assets[0].uri])
      }
    });


  };

  imageGalery = () => {

    var options = {
      title: 'Selecione Fotos',
      storageOptions: {
        skipBackup: true,
        path: 'files',
      },
    };

    launchCamera(options, res => {

      console.log('Response = ', res);
      if (res.didCancel) {
        console.log('User cancelled image picker');
      } else if (res.error) {
        console.log('ImagePicker Error: ', res.error);
      } else if (res.customButton) {
        console.log('User tapped custom button: ', res.customButton);
        alert(res.customButton);
      } else {
        let source = res;

        setArrImagesSelect(arrImagesSelect => [...arrImagesSelect, source.assets[0].uri])

      }
    });

  };


  useLayoutEffect(() => {

    async function ShowCategories() {
      const categories = await api.get("/categories");
      setListCategories(categories.data);
    }

    ShowCategories();

  }, [focus]);

  function deleteItemImage(index) {
    const arr = arrImagesSelect.filter(item => arrImagesSelect.indexOf(item) != index);
    setArrImagesSelect(arr)
  }



  async function PostProduct() {


    try {

      const data = new FormData()

      if (name === '' || description === '' || price === '' || arrImagesSelect === '') {
        console.log('Preencha Todos os Campos');
        return
      }

      data.append('name', name)
      data.append('description', description)
      data.append('price', price)

      arrImagesSelect.forEach(file => {
        data.append('files', file)
      })
      data.append('categoryID', selectedPicker)
      data.append('userID', user.id)


      await api.post('/product', data)
        .catch(function (error) {
          if (error.response) {
            // A requisição foi feita e o servidor respondeu com um código de status
            // que sai do alcance de 2xx
            console.error(error.response.data);
            console.error(error.response.status);
            console.error(error.response.headers);
          } else if (error.request) {
            // A requisição foi feita mas nenhuma resposta foi recebida
            // `error.request` é uma instância do XMLHttpRequest no navegador e uma instância de
            // http.ClientRequest no node.js
            console.error(error.request);
          } else {
            // Alguma coisa acontenceu ao configurar a requisição que acionou este erro.
            console.error('Error', error.message);
          }
          console.error('CONFIG', error.config);
        });


    } catch (error) {

      console.error("error: ", error);

    }

  }

  return (
    <View style={styles.container}>

      <View style={styles.form}>
        <ScrollView horizontal={true} style={styles.container_image}>
          {arrImagesSelect.map((item, index) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() => deleteItemImage(index)}>

                <Image
                  source={{ uri: item }}
                  style={styles.img}
                />
              </TouchableOpacity>

            )
          })}
        </ScrollView>

        <TouchableOpacity onPress={selectFile}>
          <Text>Foto</Text>
        </TouchableOpacity>


        <TextInput
          value={name}
          inlineImagePadding={40} inlineImageLeft='cube'
          style={styles.input}
          placeholder="Nome"
          onChangeText={setName}
        />
        <TextInput
          value={description}
          inlineImagePadding={40} inlineImageLeft='text_long'
          style={styles.input}
          placeholder="Descrição"
          onChangeText={setDescription}
          multiline={true}
        />
        <TextInput
          value={price}
          inlineImagePadding={40} inlineImageLeft='currency'
          style={styles.input}
          placeholder="Preço"
          onChangeText={setPrice}
          keyboardType="decimal-pad"
        />

        <TextInput
          value={size}
          inlineImagePadding={40} inlineImageLeft='size'
          style={styles.input}
          placeholder="Tamanhos"
          onChangeText={setSize}
        />

        <Picker
          style={styles.picker}
          mode="dropdown"
          selectedValue={selectedPicker}
          onValueChange={(itemValue, itemIndex) => {
            setSelectedPicker(itemValue);
          }}
        >
          <Picker.Item
            value="0"
            label="Categoria"
            enabled={false}
            style={{ color: "#999" }}
          />

          {listCategories.map((item) => {
            return (
              <Picker.Item
                key={item.id}
                value={item.id}
                label={item.name}
                style={{ fontSize: 15 }}
              />
            );
          })}
        </Picker>

        <TouchableOpacity onPress={PostProduct} style={styles.btn_postar}>
          <Text style={styles.txtbtn_postar}>Postar Produto</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  form: {
    padding: 15,
  },
  container_image: {
    padding: 2
  },
  btn_picture: {
    margin: 2,
    fontSize: 15,
    justifyContent: "center",
    height: 50,
  },
  txtbtn_picture: {
    textAlign: 'center',
    fontSize: 15,
  },
  img: {
    width: 80,
    height: 80,
    margin: 2
  },
  input: {
    height: 55,
    backgroundColor: colors.util.white,
    marginBottom: 8,
    paddingHorizontal: 15,
    borderRadius: 4,
  },
  picker: {
    backgroundColor: colors.util.white,
    marginBottom: 8,
    borderRadius: 4,
    height: 55,
  },
  btn_postar: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    marginVertical: 15,

  },
  txtbtn_postar: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});