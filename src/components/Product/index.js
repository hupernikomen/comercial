import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";

import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");

export default function Product({ item }) {
  const path = "http://192.168.0.102:3333/files";

  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("Edition", item)}
      activeOpacity={0.8}
      style={styles.containerproduct}
    >
      <Image
        style={styles.imageproduct}
        source={{}}
        // source={{ uri: `${path}/products/${item.image[0].filename}` }}
      />

      <View
        style={[
          styles.containerprice,
          {
            backgroundColor: parseFloat(item.off) > 0 ? "#222" : "#fff",
          },
        ]}
      >
        <Text
          style={[
            styles.priceproduct,
            {
              color: parseFloat(item.off) > 0 ? "#fff" : "#222",
            },
          ]}
        >
          {parseFloat(item.off)
            ? parseFloat(item.off).toFixed(2)
            : parseFloat(item.price).toFixed(2)}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  containerproduct: {
    width: "33.3%",
    height: width / 3,
    marginTop: 4,
  },
  imageproduct: {
    backgroundColor:'#ffffff70',
    marginHorizontal: 2,
    flex: 1,
  },
  containerprice: {
    paddingHorizontal: 4,
    paddingVertical: 2,
    marginTop: -26,
    alignSelf: "flex-end",
    alignItems: "flex-end",
    justifyContent: "center",
    margin: 4,
    borderRadius: 4,
  },
  priceproduct: {
    fontWeight: "600",
    color: "#222",
  },
  btnsair: {
    height: 50,
  },
  products: {
    flex: 1,
  },
});
