import React from "react";
import { View, Text, StyleSheet,TouchableOpacity } from "react-native";
import { globalStyles } from '../styles/globalStyles';

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const CustomerCard = ({ customer, navigation }) => {
  return (
<TouchableOpacity 
      onPress={() => navigation.navigate('CustomerDetailsScreen', { customer })} 
      style={styles.card}
    >
      <View>
        <Text style={styles.name}>{customer.name}</Text>
        <Text style={styles.info}>{customer.phone}</Text>
        <Text style={styles.info}>{customer.address}</Text>
        <Text style={styles.serviceDate}>Son Servis Zamanı: {formatDate(customer.lastServiceDate)}</Text>
        <Text style={styles.serviceDate}>Bir Sonraki Bakım: {formatDate(customer.nextServiceDate)}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff', // Kartın arka plan rengi
    borderRadius: 10, // Köşeleri yuvarlat
    padding: 16, // İçerik için boşluk
    marginVertical: 8, // Kartlar arasında dikey boşluk
    shadowColor: '#000', // Gölge rengi
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2, // Gölge opaklığı
    shadowRadius: 4, // Gölge yayılması
    elevation: 3, // Android için gölge
  },
  name: {
    fontSize: 18, // İsim yazı boyutu
    fontWeight: 'bold', // İsim kalın yazı
    color: '#333', // Yazı rengi
  },
  info: {
    fontSize: 16, // Diğer bilgiler için yazı boyutu
    color: '#666', // Daha açık yazı rengi
  },
  serviceDate: {
    fontSize: 14, // Servis tarihleri için yazı boyutu
    color: '#999', // Daha açık yazı rengi
    marginTop: 4, // Üstte boşluk
  },
});

export default CustomerCard;
