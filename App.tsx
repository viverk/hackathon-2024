import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, StyleSheet } from 'react-native';
import NfcManager, { NfcTech, NfcEvents } from 'react-native-nfc-manager';

// Prépare le gestionnaire NFC
NfcManager.start();

const App = () => {
  const [hasNfc, setHasNFC] = useState(null);

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
      <Text>Hello world</Text>
      <TouchableOpacity style={[styles.btn, styles.btnScan]} onPress={readTag}>
        <Text style={{ color: 'white' }}>Scan Tag</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.btn, styles.btnCancel]} onPress={cancelReadTag}>
        <Text style={{ color: 'white' }}>Cancel Scan</Text>
      </TouchableOpacity>
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
