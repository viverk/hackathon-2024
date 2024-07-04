import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

const Need = ({ onPress }) => {
  return (
    <View>
      <Pressable onPress={onPress}>
        <Text style={styles.help}>Besoin d'aide </Text>
      </Pressable>
    </View>
  );
};

export default Need;

const styles = StyleSheet.create({
  help: {
    marginTop: 55,
    fontSize: 11,
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
});
