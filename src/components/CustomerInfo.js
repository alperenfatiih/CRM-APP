import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ButtonMenu from './menuButton'; // Menü butonunun olduğu bileşen

const CustomerInfo = ({ customer, onMenuPress }) => {
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <View style={styles.infoContainer}>
    
      <View style={styles.header}>
        <Text style={styles.title}>Müşteri Bilgileri</Text>
        <ButtonMenu onPress={onMenuPress} />
      </View>

     
      <View style={styles.infoRow}>
        <Text style={styles.label}>İsim:</Text>
        <Text style={styles.value}>{customer.name}</Text>
      </View>
      <View style={styles.infoRow}>
        <Text style={styles.label}>Telefon:</Text>
        <Text style={styles.value}>{customer.phone}</Text>
      </View>
      <View style={styles.infoRow}>
        <Text style={styles.label}>Adres:</Text>
        <Text style={styles.value}>{customer.address}</Text>
      </View>
      <View style={styles.infoRow}>
        <Text style={styles.label}>Arıtma Markası:</Text>
        <Text style={styles.value}>{customer.selectedOption}</Text>
      </View>
      <View style={styles.infoRow}>
        <Text style={styles.label}>Son Yapılan İş:</Text>
        <Text style={styles.value}>{customer.lastWork}</Text>
      </View>
      <View style={styles.infoRow}>
        <Text style={styles.label}>Son Servis Zamanı:</Text>
        <Text style={styles.value}>{formatDate(customer.lastServiceDate)}</Text>
      </View>
      <View style={styles.infoRow}>
        <Text style={styles.label}>Bir Sonraki Bakım:</Text>
        <Text style={styles.value}>{formatDate(customer.nextServiceDate)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  infoContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 20,
    marginVertical: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // Android için gölge efekti
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Başlık ve menü butonunu ayırır
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10, // Her bilgi satırı için dikey boşluk
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0', // Alt çizgi
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#555', // Etiket rengi
    flex: 1, // Etiket genişliği
  },
  value: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333', // Değer rengi
    flex: 2, // Değer genişliği
    textAlign: 'right', // Değerleri sağa yaslama
  },
});

export default CustomerInfo;
