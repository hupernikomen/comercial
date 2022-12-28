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
import colors from "../../services/colors";

const { width } = Dimensions.get("window");

export default function Product({ item }) {

  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("Edition", item)}
      activeOpacity={0.8}
      style={styles.containerproduct}>

      <Image
        style={styles.imageproduct}
        source={{}} />

      <View style={styles.containerprice}>

        <Text style={[styles.priceproduct, !!item.off && {textDecorationLine: 'line-through', backgroundColor: colors.util.white }]}>
          {parseFloat(item.price).toFixed(2).replace('.', ',')}
        </Text>

        {!!item.off &&
          <Text style={[styles.priceproduct, { backgroundColor: !!item.off && colors.util.gold }]}>
            OFF {parseFloat(item.off).toFixed(2).replace('.', ',')}
          </Text>}

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
    backgroundColor: '#ffffff70',
    marginHorizontal: 2,
    flex: 1,
  },
  containerprice: {
    position: 'absolute',
    alignSelf: "flex-end",
    alignItems: "flex-end",
    justifyContent: "center",
    bottom: 5,
    right: 8,
    borderRadius: 4,
  },
  priceproduct: {
    color: "#222",
  },
  btnsair: {
    height: 50,
  },
  products: {
    flex: 1,
  },
});
