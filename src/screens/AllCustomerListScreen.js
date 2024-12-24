import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native'; // Text bileşenini buradan içe aktarın
import CustomerList from '../components/CustomerList';
import { globalStyles } from "../styles/globalStyles";
import SearchBar from '../components/SearchBar'; // Arama çubuğu bileşenini içe aktar


const AllCustomerListScreen = ({ route, navigation }) => {
  const { customers } = route.params; // customers'ı route.params'dan alıyoruz
  const [searchTerm, setSearchTerm] = useState('');
  const filteredCustomers = customers.filter((customer) =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.phone.toLowerCase().includes(searchTerm.toLowerCase())
   
  );
  return (
    <View style={styles.container}>
      <Text style={styles.title}>MÜŞTERİ LİSTESİ</Text>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <CustomerList customers={filteredCustomers} navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f4f8', // Açık gri arka plan
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333', // Başlık rengi
  },
});

export default AllCustomerListScreen; 