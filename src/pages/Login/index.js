import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Linking,
  StatusBar,
} from "react-native";

import { AuthContext } from "../../contexts/AuthContext";
import colors from "../../services/colors";

export default function Login() {

  const { signIn } = useContext(AuthContext)

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [isFilled, setIsFilled] = useState(false)

  useEffect(() => {
    email && password ? setIsFilled(true) : setIsFilled(false)
  }, [email, password]);

  async function logar() {
    await signIn({ email, password });
  }

  return (
    <View style={styles.cotainer}>

      <StatusBar hidden />
      <View style={styles.form_login}>

        <TextInput
          keyboardType='email-address'
          inlineImagePadding={40}
          inlineImageLeft='email'
          onChangeText={setEmail}
          value={email}
          style={styles.input}
          placeholder='seuemail@email.com'

        />

        <TextInput
          inlineImagePadding={40}
          inlineImageLeft='lock'
          onChangeText={setPassword}
          value={password}
          style={styles.input}
          secureTextEntry
          placeholder='*****'
        />


        <TouchableOpacity
          activeOpacity={0.7}
          style={[styles.btn_sign, {
            elevation: email && password ? 20 : 0,
          }]}
          onPress={logar}
          disabled={!email && !password ? true : false}
        >
          <Text style={styles.txtbtn_sign}>Entrar</Text>

        </TouchableOpacity>



      </View>

      <TouchableOpacity
        onPress={() =>
          Linking.openURL(`https://api.whatsapp.com/send?phone=5586994773403`)
        }
        style={styles.btn_contact}
      >
        <Text style={styles.txtbtn_contact}>Fale com o Guia</Text>

      </TouchableOpacity>


    </View>
  );
}

const styles = StyleSheet.create({
  cotainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.util.grafit
  },
  form_login: {
    width: '85%',
    zIndex: 999,
  },
  input: {
    height: 55,
    textAlign: "left",
    marginBottom: 8,
    paddingHorizontal: 25,
    borderRadius: 55 / 2,
    fontSize: 16,
    backgroundColor:colors.util.white
    
  },
  btn_sign: {
    height: 55,
    borderRadius: 55 / 2,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 15,
    backgroundColor:colors.util.dark
  },
  txtbtn_sign: {
    color: colors.util.white,
    fontWeight: '600',
    fontSize: 16,
  },
  btn_contact: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    position: 'absolute',
    bottom: 20
  },
  txtbtn_contact: {
    color: '#333',
    fontSize: 16,
  },
});
