import React, { useEffect } from 'react';
import { View, Text, StyleSheet,TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';


const SecondPage = ({ route }) => {
  const { userData } = route.params;

  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      title: 'Dashboard',
    });
  }, [navigation]);


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Kullanıcı Bilgileri</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Ad:</Text>
        <Text style={styles.value}>{userData.name}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>E-posta:</Text>
        <Text style={styles.value}>{userData.email}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Şifre:</Text>
        <Text style={styles.value}>{userData.password}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Telefon Numarası:</Text>
        <Text style={styles.value}>{userData.phone}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Ülke:</Text>
        <Text style={styles.value}>{userData.selectedCountry}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Cinsiyet:</Text>
        <Text style={styles.value}>{userData.gender}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Doğum Tarihi:</Text>
        <Text style={styles.value}>{userData.date.toDateString()}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>KVKK Onayı:</Text>
        <Text style={styles.value}>{userData.isChecked ? 'Onay Verildi' : 'Onay Verilmedi'}</Text>
      </View>
  

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  infoContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 5,
  },
  value: {
    fontSize: 18,
  },

  container2: {
    height: 40,
    width: 180,
    justifyContent: 'center',
    borderRadius: 10,
    alignItems: 'center',
    alignSelf:'center',
    backgroundColor: '#FF6969', // Kırmızı renk
  },
  title2: {
    fontSize: 15,
    color: 'white', // Beyaz renk
    fontWeight: 'bold',
    margin: 5,
  },
});

export default SecondPage;
