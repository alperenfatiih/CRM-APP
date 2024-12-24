import React from 'react';
import { View, Text, Modal, TouchableOpacity, FlatList, StyleSheet, Button } from 'react-native';

const CheckboxItem = ({ label, checked, onToggle }) => (
  <TouchableOpacity style={styles.checkboxContainer} onPress={onToggle} activeOpacity={0.8}>
    <View style={styles.checkbox}>
      {checked && <View style={styles.checkboxInner} />}
    </View>
    <Text style={styles.checkboxLabel}>{label}</Text>
  </TouchableOpacity>
);

const MaintenanceModal = ({ visible, checkboxes, onCheckboxChange, onSave, onClose }) => (
  <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onClose}>
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
        <Text style={styles.modalTitle}>Bakım Yapıldı</Text>
        <FlatList
          data={checkboxes}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <CheckboxItem
              label={item.label}
              checked={item.checked}
              onToggle={() => onCheckboxChange(index)}
            />
          )}
        />
       <View style={styles.buttonContainer}>
  <TouchableOpacity onPress={onSave} style={styles.saveButton}>
    <Text style={styles.saveButtonText}>Kaydet</Text>
  </TouchableOpacity>
  <TouchableOpacity onPress={onClose} style={styles.closeButton}>
    <Text style={styles.closeButtonText}>Kapat</Text>
  </TouchableOpacity>
</View>
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
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10, // Checkbox'lar arasındaki boşluk
    paddingVertical: 10, // Daha dokunulabilir alan için dikey iç boşluk
    paddingHorizontal: 15, // Daha estetik bir görünüm için yatay iç boşluk
    borderWidth: 1, // Çerçeve ekleyerek daha belirgin hale getirme
    borderColor: '#ccc', // Çerçeve rengi
    borderRadius: 8, // Kenarları yuvarlatma
    backgroundColor: '#fff', // Arka plan rengi
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2, // Android için gölge efekti
  },
  checkbox: {
    width: 24, // Checkbox boyutu
    height: 24,
    borderWidth: 2,
    borderColor: 'rgb(1, 39, 255)', // Çerçeve rengi
    borderRadius: 4, // Yuvarlatılmış kare görünümü
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10, // Checkbox ile etiket arasındaki boşluk
    backgroundColor: '#f8f8f8', // Arka plan rengi
  },
  checkboxInner: {
    width: 14, // İç dolgu boyutu
    height: 14,
    backgroundColor: 'rgb(4, 0, 255)', // İç dolgu rengi
    borderRadius: 2,
  },
  checkboxLabel: {
    fontSize: 16, // Yazı boyutu
    color: '#333', // Yazı rengi
    fontWeight: '500', // Yazı kalınlığı
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Butonları yatayda ayırır
    marginTop: 20,
  },
  saveButton: {
    flex: 1,
    backgroundColor: '#2196F3', // Mavi arka plan
    paddingVertical: 15, // Dikey iç boşluk
    marginHorizontal: 5, // Butonlar arasında yatay boşluk
    borderRadius: 8, // Yuvarlatılmış kenarlar
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3, // Android gölgesi
  },
  saveButtonText: {
    color: '#FFFFFF', // Beyaz yazı
    fontSize: 16,
    fontWeight: 'bold',
  },
  closeButton: {
    flex: 1,
    backgroundColor: '#F44336', // Kırmızı arka plan
    paddingVertical: 15, // Dikey iç boşluk
    marginHorizontal: 5, // Butonlar arasında yatay boşluk
    borderRadius: 8, // Yuvarlatılmış kenarlar
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3, // Android gölgesi
  },
  closeButtonText: {
    color: '#FFFFFF', // Beyaz yazı
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default MaintenanceModal;
