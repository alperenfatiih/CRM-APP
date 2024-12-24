import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity } from 'react-native';

import { Picker } from '@react-native-picker/picker';

const LastWorkInfo = ({ setLastWork }) => {
  const [checkboxes, setCheckboxes] = useState([
    { label: 'Arıtma Montajı', value: 'Arıtma Montajı', checked: false },
    { label: '5 Mikron Sediment', value: '5 Mikron Sediment', checked: false },
    { label: 'Gac Karbon', value: 'Gac Karbon', checked: false },
    { label: 'Blok Karbon', value: 'Blok Karbon', checked: false },
    { label: 'Membran', value: 'Membran', checked: false },
    { label: 'Son Karbon', value: 'Son Karbon', checked: false },
  ]);

  const handleCheckboxChange = (index) => {
    const newCheckboxes = [...checkboxes];
    newCheckboxes[index].checked = !newCheckboxes[index].checked;

    // Seçilen değerleri al
    const selectedValues = newCheckboxes
      .filter(checkbox => checkbox.checked)
      .map(checkbox => checkbox.value)
      .join(', ');

    setCheckboxes(newCheckboxes);
    setLastWork(selectedValues); // Ana bileşene güncellenmiş değerleri gönder
  };

  return (
    <View>
           {checkboxes.map((checkbox, index) => (
       <TouchableOpacity
         key={index}
         style={styles.checkboxContainer}
         onPress={() => handleCheckboxChange(index)}
         activeOpacity={0.8}
       >
         <View style={styles.checkbox}>
           {checkbox.checked && <View style={styles.checkboxInner} />}
         </View>
         <Text style={styles.checkboxLabel}>{checkbox.label}</Text>
       </TouchableOpacity>
     ))}
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    marginVertical: 10,
    color: '#555',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3,
  },
  checkboxInner: {
    width: 12,
    height: 12,
    backgroundColor: '#4CAF50',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkboxLabel: {
    marginLeft: 8,
    fontSize: 16,
    color: '#000',
  },
});

export default LastWorkInfo;