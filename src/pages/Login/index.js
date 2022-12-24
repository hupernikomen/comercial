import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../contexts/AuthContext";

export default function Login() {
  const navigation = useNavigation();

  const { signIn } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isFilled, setIsFilled] = useState(false);

  useEffect(() => {
    email && password ? setIsFilled(true) : setIsFilled(false);
  }, [email, password]);

  async function logar() {
    await signIn({ email, password });
  }

  return (
    <View style={styles.cotainer}>
      <TextInput
        onChangeText={setEmail}
        value={email}
        style={styles.input}
        placeholder="seuemail@email.com"
      />
      <TextInput
        onChangeText={setPassword}
        value={password}
        secureTextEntry
        style={styles.input}
        placeholder="****"
      />

      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.btnlogin}
        onPress={logar}
      >
        <Text style={styles.txtlogin}>Entrar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() =>
          Linking.openURL(`https://api.whatsapp.com/send?phone=5586994773403`)
        }
        style={styles.btnfaleconoso}
      >
        <Text style={styles.txtfaleconosco}>Fale com o Guia</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  cotainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  saudacao: {
    marginBottom: 20,
    fontSize: 16,
    width: "80%",
    paddingHorizontal: 15,
  },
  input: {
    width: "80%",
    height: 60,
    backgroundColor: "#fff",
    textAlign: "left",
    marginBottom: 5,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  btnlogin: {
    width: "80%",
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  txtlogin: {
    fontSize: 16,
  },
  btnfaleconoso: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  txtfaleconosco: {
    fontSize: 16,
  },
});
