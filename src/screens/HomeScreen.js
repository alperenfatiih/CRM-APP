import React, { useState, useEffect } from "react";
import { View, FlatList, Text, StyleSheet, Pressable, Alert } from "react-native";
import { db } from "../firebase/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { Button } from "react-native";

const HomeScreen = ({ navigation, route }) => {
  const [customers, setCustomers] = useState([]);

  // Verileri çekmek için fonksiyon
  const fetchCustomers = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "customers"));
      const customerList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCustomers(customerList);
      Alert.alert("Başarılı", "Veriler yenilendi.");
    } catch (error) {
      Alert.alert("Hata", "Veriler yenilenirken bir sorun oluştu.");
      console.error("Yenileme hatası:", error);
    }
  };

  // Bileşen ilk yüklendiğinde ve route.params değiştiğinde verileri çek
  useEffect(() => {
    fetchCustomers();
  }, [route.params]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Müşteri Yönetim Sistemi</Text>

      
      <View style={styles.buttonContainer}>
        <Button
          title="Müşteri Ekle"
          onPress={() => navigation.navigate("AddCustomer", { customers })}
          color="#4CAF50"
        />
      </View>
      <View style={styles.spacer} />
      <View style={styles.buttonContainer}>
        <Button
          title="Müşteri Listesi"
          onPress={() => navigation.navigate("AllCustomerList", { customers })}
          color="#2196F3"
        />
      </View>
      <View style={styles.spacer} />
      <View style={styles.buttonContainer}>
        <Button
          title="Yaklaşan İşler"
          onPress={() => navigation.navigate("UpcomingWorks", { customers })}
          color="#FF9800"
        />
      </View>

      
      <Pressable style={styles.refreshBox} onPress={fetchCustomers}>
        <Text style={styles.refreshText}>↻</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f8f8f8",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#333",
  },
  buttonContainer: {
    borderRadius: 10,
    overflow: "hidden",
    elevation: 3,
    marginBottom: 10,
  },
  spacer: {
    height: 15,
  },
  refreshBox: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#2196F3",
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
  refreshText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
});

export default HomeScreen;
