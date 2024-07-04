import React from "react";
import { Image, StyleSheet, Text, View, TextInput, Pressable } from "react-native";

const ModalContent = ({code, setCode, handleSubmit}) => {

  return (
    <View style={styles.container}>
      {/* <Text style={styles.help}>Besoin d'aide ?</Text> */}

      <View style={styles.inputZone}>
        <TextInput
            style={styles.input}
            placeholder="Entrez votre code"
            placeholderTextColor='#4b4b4b'
            onChangeText={setCode}
            value={code}
          />
        <Pressable style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Envoyer</Text>
          </Pressable>
      </View>

      {/* <View style={styles.loose}>
        <Image style={styles.share} source={require("../assets/share.png")} />
        <Text>Déclarer la perte de votre carte d'accès</Text>
      </View>

      <View style={styles.loose}>
        <Image style={styles.share} source={require("../assets/share.png")} />
        <Text> Déclarer le vol de votre carte d'accès</Text>
      </View>

      <Text style={styles.quiz}>
        Pour toute autre question, veuillez vous rapprocher de votre service IT
      </Text> */}
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
  input: {
    borderColor: '#4b4b4b',
    borderWidth: 1,
    backgroundColor: '#FFF',
    color: '#4b4b4b',
    width: '100%',
    height: 50,
    textAlign: 'center',
    marginBottom: 20,
    marginTop: 30,
    borderRadius: 50,
  },
  inputZone: {
    paddingHorizontal: 50,
    paddingVertical: 5,
  },
  button: {
    backgroundColor: '#6A1B9A',
    paddingVertical: 10,
    borderRadius: 50,
  },
  buttonText: {
    textAlign: 'center',
    color: '#fff',
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
