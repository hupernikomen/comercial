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

  const [resourcePath, setResoucePath] = useState([])

  selectFile = () => {
    var options = {
      title: 'Selecione Fotos',
      storageOptions: {
        skipBackup: true,
        path: 'files',
      },
    };
    launchImageLibrary(options, res => {


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

        setResoucePath(source.assets)
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

        setResoucePath(source.assets)

      }
    });
  };


  useLayoutEffect(() => {

    async function ShowCategories() {
      const categories = await api.get("/categories");
      setListCategories(categories.data);
    }

    ShowCategories();
    Limpar()
  }, [focus]);

  function Limpar() {
    setName("")
    setDescription("")
    setPrice("")
    setSize("")
    setColor("")
    setSelectedPicker("")
  }

  async function PostProduct() {

    try {
      if (name != "" && price != "" && description != "" && selectedPicker != "") {
        await api
          .post("/product", {
            name: name,
            description: description,
            price: price,
            off: '',
            size: '',
            color: '',
            categoryID: selectedPicker,
            userID: user.id,
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          })
          .then(function (response) {
            alert(response.data.mensagem);
            Limpar()
            navigation.navigate('Home')
          })
      } else {
        alert('Algumas informações precisam ser preenchidas')
      }
    } catch (error) {
      
    }


  }

  return (
    <View style={styles.container}>

      <View style={styles.form}>
        <ScrollView horizontal={true} style={styles.containerImage}>

          {resourcePath.map((item, index) => {
            return (

              <Image
                key={index}
                source={{ uri: item.uri }}
                style={styles.img}
              />

            )
          })}
        </ScrollView>

        <View style={{flexDirection:'row',justifyContent:'space-around'}}>

          <TouchableOpacity onPress={selectFile} style={styles.button}>
            <Text style={styles.buttonText}>Galeria de Fotos</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={imageGalery} style={styles.button}>
            <Text style={styles.buttonText}>Tirar Foto</Text>
          </TouchableOpacity>

        </View>


        <TextInput
          value={name}
          style={styles.input}
          placeholder="Nome"
          onChangeText={setName}
        />
        <TextInput
          value={description}
          style={styles.input}
          placeholder="Descrição"
          onChangeText={setDescription}
          multiline={true}
        />
        <TextInput
          value={price}
          style={styles.input}
          placeholder="Preço"
          onChangeText={setPrice}
          keyboardType="decimal-pad"
          inlineImageLeft='dollar-sign'
        />

        <TextInput
          value={size}
          style={styles.input}
          placeholder="Tamanhos"
          onChangeText={setSize}
          label={<Text>okokokok</Text>}
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
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  containerImage: {
    backgroundColor: '#fff',
    padding: 2
  },
  button: {
    margin: 2,
    fontSize: 15,
    justifyContent: "center",
    height: 50,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 15,
  },
  img: {
    width: 80,
    height: 80,
    margin: 2
  },



  container: {
    flex: 1,
  },
  form: {
    padding: 15,
  },
  input: {
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    fontSize: 15,
    margin: 2,
    minHeight: 50,
  },
  picker: {
    backgroundColor: "#fff",
    fontSize: 15,
    margin: 2,
    height: 50,
  },
  btncadastrar: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  txtbtn: {
    fontSize: 16,
  },
});
