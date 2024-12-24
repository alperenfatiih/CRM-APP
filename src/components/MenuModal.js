import React from 'react';
import { View, Text, Modal, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

const MenuModal = ({ visible, options, onClose }) => (
  <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onClose}>
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
        <FlatList
          data={options}
          keyExtractor={(item) => item.label}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.menuItem} onPress={item.action}>
              <Text style={styles.menuText}>{item.label}</Text>
            </TouchableOpacity>
          )}
        />
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Text style={styles.closeButtonText}>Kapat</Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    elevation: 5,
  },
  menuItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  menuText: {
    fontSize: 18,
  },
  closeButton: {
    marginTop: 10,
    padding: 10,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#007BFF',
    fontWeight: 'bold',
  },
});

export default MenuModal;
