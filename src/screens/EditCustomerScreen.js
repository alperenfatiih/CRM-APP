import React, { useState } from 'react';
import { View, TextInput,ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { db } from '../firebase/firebaseConfig';
import { doc, updateDoc } from 'firebase/firestore';
import DatePicker from '../components/DatePicker';
import { Picker } from '@react-native-picker/picker';

const EditCustomerScreen = ({ route, navigation }) => {
  const { customer } = route.params;

  const [name, setName] = useState(customer.name);
  const [phone, setPhone] = useState(customer.phone.startsWith('+90') ? customer.phone.replace('+90', '') : customer.phone);
  const [address, setAddress] = useState(customer.address);
  const [lastServiceDate, setLastServiceDate] = useState(new Date(customer.lastServiceDate));
  const [nextServiceDate, setNextServiceDate] = useState(new Date(customer.nextServiceDate));

  // Checkbox'lar için state
  const [checkboxes, setCheckboxes] = useState([
    { label: 'Arıtma Montajı', value: 'Arıtma Montajı', checked: false },
    { label: '5 Mikron Sediment', value: '5 Mikron Sediment', checked: false },
    { label: 'Gac Karbon', value: 'Gac Karbon', checked: false },
    { label: 'Blok Karbon', value: 'Blok Karbon', checked: false },
    { label: 'Membran', value: 'Membran', checked: false },
    { label: 'Son Karbon', value: 'Son Karbon', checked: false }, 
  ]);

  const [selectedOption, setSelectedOption] = useState(customer.selectedOption || 'Option 1');

  const handleCheckboxChange = (index) => {
    const updatedCheckboxes = [...checkboxes];
    updatedCheckboxes[index].checked = !updatedCheckboxes[index].checked;
    setCheckboxes(updatedCheckboxes);
  };

  const handleUpdateCustomer = async () => {
    // Seçili checkbox değerlerini birleştir
    const lastWork = checkboxes
      .filter((checkbox) => checkbox.checked)
      .map((checkbox) => checkbox.value)
      .join(', ');

    const customerRef = doc(db, 'customers', customer.id);
    let formattedPhone = phone;

    // Eğer telefon numarası +90 ile başlamıyorsa, başına +90 ekle
    if (!formattedPhone.startsWith('+90')) {
      formattedPhone = `+90${formattedPhone}`;
    }
    await updateDoc(customerRef, {
      name,
      phone:formattedPhone,
      address,
      selectedOption,
      lastWork,
      lastServiceDate: lastServiceDate.toISOString(),
      nextServiceDate: nextServiceDate.toISOString(),
    });

    navigation.reset({
      index: 0,
      routes: [{ name: 'Home', params: { refresh: true } }],
    });
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>PROFİLİ DÜZENLE</Text>

        <TextInput 
          style={styles.input} 
          placeholder="Name" 
          value={name} 
          onChangeText={setName} 
        />

       <View style={styles.phoneInputContainer}>
                <Text style={styles.phonePrefix}>+90</Text>
                <TextInput
                  style={styles.phoneInput}
                  placeholder="Phone (10 haneli)"
                  value={phone}
                  onChangeText={setPhone}
                  keyboardType="number-pad"
                  maxLength={10} // Kullanıcının yalnızca 10 haneli numara girmesini sağlar
                />
              </View>

        <TextInput 
          style={styles.input} 
          placeholder="Address" 
          value={address} 
          onChangeText={setAddress} 
        />

       
        <Text style={styles.label}>Arıtma Tipi Seç:</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedOption}
            onValueChange={(itemValue) => setSelectedOption(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Inline" value="Inline" />
            <Picker.Item label="Compact" value="Compact" />
            <Picker.Item label="Digital" value="Digital" />
            <Picker.Item label="Diger" value="Diger" />
          </Picker>
        </View>

        <Text style={styles.label}>Son Yapılan İşler:</Text>
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

        <Text style={styles.label}>Son Servis Zamanı:</Text>
        <View style={styles.datePickerContainer}>
          <DatePicker date={lastServiceDate} setDate={setLastServiceDate} />
        </View>

        <Text style={styles.label}>Bir Sonraki Bakım:</Text>
        <View style={styles.datePickerContainer}>
          <DatePicker date={nextServiceDate} setDate={setNextServiceDate} />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleUpdateCustomer}>
          <Text style={styles.buttonText}>PROFİLİ GÜNCELLE</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  container: {
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  phoneInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  phonePrefix: {
    paddingHorizontal: 10,
    fontSize: 16,
    color: '#555',
    backgroundColor: '#e6e6e6',
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  phoneInput: {
    flex: 1,
    height: 50,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 16,
    marginVertical: 10,
    color: '#555',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 5,
    marginBottom: 20,
    backgroundColor: '#FFFFFF',
  },
  picker: {
    height: 50,
    width: '100%',
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
  datePickerContainer: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    padding: 12,
    marginBottom: 20,
  },
  button: {
    marginTop: 24,
    backgroundColor: '#007BFF',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default EditCustomerScreen;
