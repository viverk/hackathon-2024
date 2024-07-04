import React from 'react';
import {StyleSheet, View, Modal, Text, Pressable} from 'react-native';
// import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const NeedModal = ({isVisible, children, onClose}) => {
  return (
    <Modal animationType="slide" transparent={true} visible={isVisible}>
      <View style={styles.modalContent}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Aide</Text>
          <Pressable onPress={onClose}>
            {/* <MaterialIcons name="close" color="#fff" size={22} /> */}
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
    backgroundColor: '#464C55',
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
});
