import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text,TouchableOpacity ,ScrollView} from 'react-native';
import { db } from '../firebase/firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import DatePicker from '../components/DatePicker';
import { CheckBox } from 'react-native-elements';
import { Picker } from '@react-native-picker/picker';


const AddCustomerScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [lastServiceDate, setLastServiceDate] = useState(new Date());
  const [nextServiceDate, setNextServiceDate] = useState(new Date());
  const [checkboxes, setCheckboxes] = useState([
    { label: 'Arıtma Montajı', value: 'Arıtma Montajı', checked: false },
    { label: 'Sediment', value: 'Sediment', checked: false },
    { label: 'Gac Karbon', value: 'Gac Karbon', checked: false },
    { label: 'Blok Karbon', value: 'Blok Karbon', checked: false },
    { label: 'Membran', value: 'Membran', checked: false },
    { label: 'Son Karbon', value: 'Son Karbon', checked: false },
  ]);
  const [selectedOption, setSelectedOption] = useState('Inline');

  const handleCheckboxChange = (index) => {
    const updatedCheckboxes = [...checkboxes];
    updatedCheckboxes[index].checked = !updatedCheckboxes[index].checked;
    setCheckboxes(updatedCheckboxes);
  };

  const handleAddCustomer = async () => {
    // Seçili işlerin değerlerini birleştir
    const lastWork = checkboxes
      .filter((checkbox) => checkbox.checked)
      .map((checkbox) => checkbox.value)
      .join(', ');

      const formattedPhone = `+90${phone}`;
    await addDoc(collection(db, 'customers'), {
      name,
      phone: formattedPhone,
      address,
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
    <ScrollView contentContainerStyle={styles.scrollContainer}>
    <View style={styles.container} >
      <Text style={styles.title}>MÜŞTERİ EKLEME</Text>

      <TextInput 
        style={styles.input} 
        placeholder="İsim" 
        value={name} 
        onChangeText={setName} 
      />
         <View style={styles.phoneInputContainer}>
          <Text style={styles.phonePrefix}>+90</Text>
          <TextInput
            style={styles.phoneInput}
            placeholder="Telefon (10 haneli)"
            value={phone}
            onChangeText={setPhone}
            keyboardType="number-pad"
            maxLength={10}
          />
        </View>
      <TextInput 
        style={styles.input} 
        placeholder="Adres" 
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

      <Text style={styles.label}>Son Yapılan İş:</Text>
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

      <Button 
        title="Müşteri Ekle" 
        onPress={handleAddCustomer} 
        color="#4CAF50" 
        style={styles.button} 
      />
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
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
  datePickerContainer: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    padding: 12,
    marginBottom: 20,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  button: {
    marginTop: 10,
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
    borderColor: '#4CAF50', // Çerçeve rengi
    borderRadius: 4, // Yuvarlatılmış kare görünümü
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10, // Checkbox ile etiket arasındaki boşluk
    backgroundColor: '#f8f8f8', // Arka plan rengi
  },
  checkboxInner: {
    width: 14, // İç dolgu boyutu
    height: 14,
    backgroundColor: '#4CAF50', // İç dolgu rengi
    borderRadius: 2,
  },
  checkboxLabel: {
    fontSize: 16, // Yazı boyutu
    color: '#333', // Yazı rengi
    fontWeight: '500', // Yazı kalınlığı
  },
  
});

export default AddCustomerScreen;
