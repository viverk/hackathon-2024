import React, { useEffect, useState } from 'react';
import { View, Text, Image, SafeAreaView, StyleSheet, Pressable } from 'react-native';
import NfcManager, { NfcTech, NfcEvents, Ndef } from 'react-native-nfc-manager';
import Need from "./components/Need";
import NeedModal from "./components/NeedModal";
import ModalContent from "./components/ModalContent";
import axios from 'axios';

// Prépare le gestionnaire NFC
NfcManager.start();

const App = () => {
  const [hasNfc, setHasNFC] = useState(null);
  const [tokenCard, setTokenCard] = useState('')
  const [code, setCode] = useState('')
  const [isModalVisible, setIsModalVisible] = useState(false);

  const onModalClose = () => {
    setIsModalVisible(false);
  };

  const onModalOpen = () => {
    setIsModalVisible(true);
  };

  const handleSubmit = async () => {
    if (tokenCard) {
      try {
        axios.get('http://10.13.14.180:5000/tokens/' + tokenCard)
        .then(r => {
          console.log(r);
        })
        .catch(error => {
          console.error('An error occurred:', error);
        });
      } catch (error) {
        console.log(error)
      }
    } else {
      console.log("scannez d'abord votre carte");
    }
  }

  useEffect(() => {
    const checkIsSupported = async () => {
      const deviceIsSupported = await NfcManager.isSupported();
      setHasNFC(deviceIsSupported);
      if (deviceIsSupported) {
        await NfcManager.start();
      }
    };

    checkIsSupported();
  }, []);

  useEffect(() => {
    const tagDiscovered = (tag) => {
      console.log('Tag found', tag);
    };

    NfcManager.setEventListener(NfcEvents.DiscoverTag, tagDiscovered);

    return () => {
      NfcManager.setEventListener(NfcEvents.DiscoverTag, null);
    };
  }, []);

  const readTag = async () => {
    try {
      await NfcManager.requestTechnology(NfcTech.Ndef);
      const tag = await NfcManager.getTag();
      const ndefMessage = tag?.ndefMessage
      const payloadDecrypt = Ndef.text.decodePayload(ndefMessage[0].payload)

      setTokenCard(payloadDecrypt)
      onModalOpen()
    } catch (ex) {
      console.warn(ex);
    } finally {
      NfcManager.cancelTechnologyRequest();
    }
  };

  const cancelReadTag = async () => {
    try {
      await NfcManager.cancelTechnologyRequest();
    } catch (ex) {
      console.warn(ex);
    }
  };

  if (hasNfc === null) return null;

  if (!hasNfc) {
    return (
      <View style={styles.container}>
        <Text>NFC not supported</Text>
      </View>
    );
  }

  return (
    // <SafeAreaView style={styles.sectionContainer}>
    <View style={styles.container}>
      <Text style={styles.title}>
        Placer votre carte d'accès pour vous authentifier
      </Text>
      <Pressable onPress={readTag}>
        <Image style={styles.image} source={require("./assets/nfc-login.png")} />
      </Pressable>

      <Need onPress={onModalOpen} />

      <NeedModal isVisible={isModalVisible} onClose={onModalClose}>
        <ModalContent code={code} setCode={setCode} handleSubmit={handleSubmit} />
      </NeedModal>
      {/* <StatusBar style="auto" /> */}
    </View>
    // </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#d4ecff",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    paddingLeft: 10,
    paddingRight: 10,
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
    color: '#4b4b4b',
  },
  image: {
    marginTop: 25,
  },
});

export default App;
