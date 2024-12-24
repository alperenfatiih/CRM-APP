import React, { useState } from 'react';
import { View, StyleSheet,Linking,ScrollView, TouchableOpacity,Alert,Pressable,Text  } from 'react-native';
import {  FontAwesome ,MaterialIcons  } from 'react-native-vector-icons';
import CustomerInfo from '../components/CustomerInfo';
import MenuModal from '../components/MenuModal';
import ButtonMenu from '../components/menuButton';
import MaintenanceModal from '../components/MaintenanceModal';
import { getFirestore, doc, deleteDoc, updateDoc } from 'firebase/firestore';
const CustomerDetailsScreen = ({ route, navigation }) => {
  const { customer } = route?.params || {};
  const [menuModalVisible, setMenuModalVisible] = useState(false);
  const [maintenanceModalVisible, setMaintenanceModalVisible] = useState(false);
  const [checkboxes, setCheckboxes] = useState([
    { label: 'Arıtma Montajı', value: 'Arıtma Montajı', checked: false },
    { label: 'Sediment', value: 'Sediment', checked: false },
    { label: 'Gac Karbon', value: 'Gac Karbon', checked: false },
    { label: 'Blok Karbon', value: 'Blok Karbon', checked: false },
    { label: 'Membran', value: 'Membran', checked: false },
    { label: 'Son Karbon', value: 'Son Karbon', checked: false },
  ]);

  const handleCheckboxChange = (index) => {
    const updatedCheckboxes = checkboxes.map((checkbox, i) => ({
      ...checkbox,
      checked: i === index ? !checkbox.checked : checkbox.checked,
    }));
    setCheckboxes(updatedCheckboxes);
  };
  const handleSaveMaintenance = async () => {
    const db = getFirestore();
    const customerRef = doc(db, 'customers', customer.id);

    const today = new Date();
    const lastServiceDate = today.toISOString().split('T')[0];
    const nextServiceDate = new Date(today.setMonth(today.getMonth() + 12)).toISOString().split('T')[0];
    const lastWork = checkboxes.filter((checkbox) => checkbox.checked).map((checkbox) => checkbox.label).join(', ');

    try {
      await updateDoc(customerRef, {
        lastServiceDate,
        nextServiceDate,
        lastWork,
      });
      Alert.alert('Başarılı', 'Bakım bilgileri başarıyla güncellendi.');
      setMaintenanceModalVisible(false);
      navigation.reset({
        index: 0,
        routes: [{ name: 'Home', params: { refresh: true } }],
      });
    } catch (error) {
      console.error('Bakım bilgileri güncelleme hatası:', error);
      Alert.alert('Hata', 'Bakım bilgileri güncellenirken bir hata oluştu.');
    }
  };
  const handleEditCustomer = () => {
    navigation.navigate('EditCustomer', { customer });
    setMenuModalVisible(false);
  };
  const handleDeleteCustomer = () => {
    Alert.alert('Müşteri Sil', 'Bu müşteriyi silmek istediğinize emin misiniz?', [
      { text: 'İptal', style: 'cancel' },
      {
        text: 'Sil',
        onPress: async () => {
          const db = getFirestore();
          const customerRef = doc(db, 'customers', customer.id);

          try {
            await deleteDoc(customerRef);
            Alert.alert('Başarılı', 'Müşteri başarıyla silindi.');
            navigation.reset({
              index: 0,
              routes: [{ name: 'Home', params: { refresh: true } }],
            });
          } catch (error) {
            Alert.alert('Hata', 'Müşteri silinirken bir hata oluştu.');
          }
        },
      },
    ]);
  };
  const openPhone = () => {
    const phoneNumber = `tel:${customer.phone}`;
    Linking.openURL(phoneNumber).catch(() =>
      Alert.alert('Hata', 'Telefon araması açılamadı.')
    );
  };
  const openWhatsApp = () => {
    let phoneNumber = customer.phone;
  
    // Eğer telefon numarası 90 ile başlamıyorsa, başına 90 ekle
    if (!phoneNumber.startsWith('90')) {
      phoneNumber = `90${phoneNumber}`;
    }
  
    const message = ' ';
    const whatsappUrl = `whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
  
    Linking.openURL(whatsappUrl).catch(() =>
      Alert.alert('Hata', 'WhatsApp açılamadı. Lütfen uygulamanın yüklü olduğundan emin olun.')
    );
  };

  const openMaps = () => {
    const address = encodeURIComponent(customer.address);
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${address}`;
    Linking.openURL(mapsUrl).catch(() =>
      Alert.alert('Hata', 'Haritalar açılamadı.')
    );
  };

  const menuOptions = [
    { label: 'Profili Düzenle', action:handleEditCustomer},
    { label: 'Müşteriyi Sil', action: handleDeleteCustomer },

  ];
  
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
    <View style={styles.container}>
   
    <CustomerInfo customer={customer} onMenuPress={() => setMenuModalVisible(true)} />

    <Pressable
      style={({ pressed }) => [
        styles.maintenanceButton,
        { opacity: pressed ? 0.7 : 1 }, // Basıldığında opaklık efekti
      ]}
      onPress={() => setMaintenanceModalVisible(true)}
    >
      <Text style={styles.maintenanceButtonText}>Bakım Yapıldı</Text>
    </Pressable>

    <View style={styles.actionButtons}>
      <Pressable style={styles.actionButton} onPress={openPhone}>
        <FontAwesome name="phone" size={24} color="white" />
        <Text style={styles.actionButtonText}>Ara</Text>
      </Pressable>
      <Pressable style={styles.actionButton} onPress={openWhatsApp}>
        <FontAwesome name="whatsapp" size={24} color="white" />
        <Text style={styles.actionButtonText}>WhatsApp</Text>
      </Pressable>
      <Pressable style={styles.actionButton} onPress={openMaps}>
        <FontAwesome name="map" size={24} color="white" />
        <Text style={styles.actionButtonText}>Haritada Aç</Text>
      </Pressable>
    </View>

    <MenuModal
      visible={menuModalVisible}
      options={menuOptions}
      onClose={() => setMenuModalVisible(false)}
    />
    <MaintenanceModal
      visible={maintenanceModalVisible}
      checkboxes={checkboxes}
      onCheckboxChange={handleCheckboxChange}
      onSave={handleSaveMaintenance}
      onClose={() => setMaintenanceModalVisible(false)}
    />
  </View>
  </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginVertical: 10,
  },
  menuButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  maintenanceButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
    marginVertical: 20,
  },
  maintenanceButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#2196F3',
    marginHorizontal: 5,
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionButtonText: {
    color: 'white',
    marginTop: 5,
    fontWeight: 'bold',
  },
});

export default CustomerDetailsScreen;
 