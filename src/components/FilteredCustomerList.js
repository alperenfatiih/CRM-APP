import React from 'react';
import { View, Text ,StyleSheet} from 'react-native';
import CustomerList from './CustomerList';
import { isUpcomingOrOverdue } from '../utils/dateUtils';
import { globalStyles } from '../styles/globalStyles';

const FilteredCustomerList = ({ customers, navigation }) => {
  // Eğer müşteri listesi boşsa
  if (!customers || customers.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.emptyMessage}>Hiç müşteri bulunamadı.</Text>
      </View>
    );
  }

  // Müşteri listesini `nextServiceDate`'e göre filtrele
  const overdueCustomers = customers.filter((customer) =>
    isUpcomingOrOverdue(customer.nextServiceDate)
  );

  // Eğer filtrelenmiş müşteri yoksa
  if (overdueCustomers.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.emptyMessage}>Hiç geç kalmış müşteri yok.</Text>
      </View>
    );
  }

  // Filtrelenmiş müşterileri listele
  return (
    <View style={styles.container}>
      <View style={styles.navbar}>
        <Text style={styles.navbarTitle}>YAKLAŞAN İŞLER</Text>
      </View>
      <CustomerList customers={overdueCustomers} navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f4f8', // Açık gri arka plan
  },
  navbar: {
    backgroundColor: '#f8f8f8', // Kırık beyaz arka plan
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
    shadowColor: '#000', // Gölge rengi
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1, // Gölge opaklığı
    shadowRadius: 4, // Gölge yayılması
    elevation: 3, // Android için gölge
  },
  navbarTitle: {
    fontSize: 20,
    color: '#333', // Yazı rengi
    textAlign: 'center',
    fontWeight: 'bold',
  },
  emptyMessage: {
    fontSize: 18,
    color: '#666', // Mesaj rengi
    textAlign: 'center',
    marginTop: 20,
  },
});

export default FilteredCustomerList;