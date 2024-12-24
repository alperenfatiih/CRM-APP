import React from 'react';
import { View, Text,StyleSheet } from 'react-native';
import FilteredCustomerList from '../components/FilteredCustomerList';
import globalStyles from '../styles/globalStyles';

const UpcomingWorksScreen = ({ route, navigation }) => {
  const { customers } = route.params || {}; // Boşsa varsayılan değer ata

 // Gelen müşterileri kontrol edin

  return (
    
    <FilteredCustomerList customers={customers} navigation={navigation} />
 
);
};



export default UpcomingWorksScreen;
