import React from 'react';
import { FlatList , View, StyleSheet} from 'react-native';
import CustomerCard from './CustomerCard';
import { globalStyles } from '../styles/globalStyles';
const CustomerList = ({ customers, navigation }) => {
  return (
    <View style={styles.container}>
    <FlatList
      data={customers}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <CustomerCard customer={item} navigation={navigation} />}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.listContainer} // İçerik stilini ayarlıyoruz
    />
  </View>
    
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16, // Kenar boşlukları ekleyerek taşmayı önlüyoruz
    backgroundColor: '#f8f8f8', // Arka plan rengi
  },
  listContainer: {
    paddingBottom: 16, // Alt kısımda boşluk bırakıyoruz
  },
});

export default CustomerList;