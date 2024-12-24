import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

const SearchBar = ({ searchTerm, setSearchTerm }) => {
  return (
    <View style={styles.container}>
    <TextInput
      style={styles.input}
      placeholder="İsim veya telefon numarası ile ara..."
      value={searchTerm}
      onChangeText={setSearchTerm}
      placeholderTextColor="#888" // Placeholder rengi
    />
  </View>
);
};

const styles = StyleSheet.create({
container: {
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  margin: 20, // Dışarıdan boşluk
},
input: {
  height: 50, // Yükseklik
  width: '100%', // Genişlik
  borderColor: '#ccc', // Kenar rengi
  borderWidth: 1, // Kenar kalınlığı
  borderRadius: 25, // Yuvarlak köşeler
  paddingHorizontal: 20, // İçerideki boşluk
  backgroundColor: '#fff', // Arka plan rengi
  fontSize: 16, // Yazı boyutu
  shadowColor: '#000', // Gölge rengi
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.1, // Gölge opaklığı
  shadowRadius: 4, // Gölge yayılması
  elevation: 3, // Android için gölge
},
});

export default SearchBar;