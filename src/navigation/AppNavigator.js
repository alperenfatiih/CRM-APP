import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import AddCustomerScreen from '../screens/AddCustomerScreen';
import EditCustomerScreen from '../screens/EditCustomerScreen';
import CustomerDetailsScreen from '../screens/CustomerDetailsScreen';
import UpcomingWorksScreen from '../screens/UpcomingWorksScreen';
import AllCustomerListScreen from '../screens/AllCustomerListScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="AddCustomer" component={AddCustomerScreen} />
        <Stack.Screen name="EditCustomer" component={EditCustomerScreen} />
        <Stack.Screen name="CustomerDetailsScreen" component={CustomerDetailsScreen} />      
       
        <Stack.Screen name="AllCustomerList" component={AllCustomerListScreen} />
        <Stack.Screen name="UpcomingWorks" component={UpcomingWorksScreen} />       
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;