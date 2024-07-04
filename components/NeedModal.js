import React from 'react';
import {StyleSheet, View, Modal, Text, Pressable} from 'react-native';

const NeedModal = ({isVisible, children, onClose}) => {
  return (
    <Modal animationType="slide" transparent={true} visible={isVisible}>
      <View style={styles.modalContent}>
        <View style={styles.titleContainer}>
          <Pressable style={styles.button} onPress={onClose}>
            <Text style={styles.buttonText}>Fermer x</Text>
          </Pressable>
        </View>
        {children}
      </View>
    </Modal>
  );
};

export default NeedModal;

const styles = StyleSheet.create({
  modalContent: {
    height: '28%',
    width: '100%',
    backgroundColor: 'white',
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    position: 'absolute',
    bottom: 0,
  },
  titleContainer: {
    height: '16%',
    backgroundColor: '#fff',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    color: '#fff',
    fontSize: 16,
  },
  button: {
    width: '100%'
  },
  buttonText: {
    color: '#4b4b4b',
    textAlign: 'right'
  }
});
