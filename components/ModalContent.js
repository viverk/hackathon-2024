import React from "react";
import { Image, StyleSheet, Text, View, TextInput, Button } from "react-native";

const ModalContent = ({code, setCode, handleSubmit}) => {

  return (
    <View style={styles.container}>
      {/* <Text style={styles.help}>Besoin d'aide ?</Text> */}

      <TextInput
          style={styles.input}
          placeholder="Entrez votre code"
          onChangeText={setCode}
          value={code}
        />

      <Button onPress={handleSubmit}>Envoyer</Button>  

      <View style={styles.loose}>
        <Image style={styles.share} source={require("../assets/share.png")} />
        <Text>Déclarer la perte de votre carte d'accès</Text>
      </View>

      <View style={styles.loose}>
        <Image style={styles.share} source={require("../assets/share.png")} />
        <Text> Déclarer le vol de votre carte d'accès</Text>
      </View>

      <Text style={styles.quiz}>
        Pour toute autre question, veuillez vous rapprocher de votre service IT
      </Text>
    </View>
  );
};

export default ModalContent;

const styles = StyleSheet.create({
  container: {
    textAlign: "center",
  },
  help: {
    fontFamily: "BuenosAires-Regular",
    textAlign: "center",
    marginTop: 25,
    fontSize: 16,
    fontWeight: "bold",
  },
  loose: {
    flexDirection: "row",
    fontFamily: "BuenosAires-Regular",
    marginTop: 10,
    justifyContent: "center", // Centre verticalement
    alignItems: "center", //
  },
  quiz: {
    textAlign: "center",
    marginTop: 10,
    color: "#C388D7",
    paddingLeft: 10,
    paddingRight: 10,
    fontStyle: "italic",
  },
  share: {
    width: 12,
    height: 12,
    marginRight: 10,
  },
});
