import React, { useEffect, useState } from 'react';
import { View, Text, Image, SafeAreaView, StyleSheet } from 'react-native';
import NfcManager, { NfcTech, NfcEvents } from 'react-native-nfc-manager';
import Need from "./components/Need";
import NeedModal from "./components/NeedModal";
import ModalContent from "./components/ModalContent";

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

  const handleSubmit = () => {
    if (tokenCard) {
      try {
        axios.post('/api/')
      } catch (error) {
        console.log(error);
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
      setTokenCard(tag)
      onModalOpen()
      console.log(tag);
      alert(`Tag détecté : ${JSON.stringify(tag)}`);
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
      <View style={styles.sectionContainer}>
        <Text>NFC not supported</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.sectionContainer}>
      <View style={styles.container}>
      <Text style={styles.text}>
        Placer votre carte d'accès pour vous authentifier
      </Text>
      <Image style={styles.image} source={require("./assets/nfc-login.png")} onPress={readTag} />

      <Need onPress={onModalOpen} />

      <NeedModal isVisible={isModalVisible} onClose={onModalClose}>
        <ModalContent code={code} setCode={setCode} handleSubmit={handleSubmit} />
      </NeedModal>
      {/* <StatusBar style="auto" /> */}
    </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    padding: 10,
    margin: 10,
    borderRadius: 5,
  },
  btnScan: {
    backgroundColor: 'blue',
  },
  btnCancel: {
    backgroundColor: 'red',
  },
});

export default App;
