import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button,TouchableOpacity,StyleSheet} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import axios from 'axios';
import DateTimePicker from '@react-native-community/datetimepicker';


const Home = ({navigation}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [gender, setGender] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxToggle = () => {
    setIsChecked(!isChecked);
  };


  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };

  const handleRegister = () => {
    if (name && email && password && isChecked) {
      const userData = {
        name,
        email,
        password,
        phone,
        selectedCountry,
        gender,
        date,
        isChecked,
      };
  
      // Kullanıcı verilerini SecondPage ekranına gönder
      navigation.navigate('SecondPage', { userData });
    } else {
      setMessage('Lütfen ad, e-posta, şifre ve KVKK alanlarını doldurun.');
    }
  };

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get('https://restcountries.com/v3.1/all');
        const countriesData = response.data.map((country) => ({
          label: country.translations.tur?.official || country.name.common,
          value: country.translations.tur?.common || country.name.common,
        }));
        setCountries(countriesData);
      } catch (error) {
        console.error('API çağrısı başarısız oldu:', error);
      }
    };

    fetchCountries();
  }, []);


  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Adınız"
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="E-posta Adresiniz"
        value={email}
        onChangeText={(text) => setEmail(text)}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Şifreniz"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        keyboardType='numeric'
        placeholder="Telefon Numaranız"
        value={phone}
        onChangeText={(text) => setPhone(text)}
      />
    <View style = {styles.container3}>
    <RNPickerSelect
        onValueChange={(value) => {
          setSelectedCountry(value);
        }}
        items={countries}
        placeholder={{ label: "Ülkenizi Seçin", value: null }}
        style={{
          placeholder: {
            color: 'black',
            fontSize: 18,
          },
          inputIOS: {
            color: 'black',
            fontSize: 18,
          },
          inputAndroid: {
            color: 'black',
            fontSize: 18,
          },
        }}
      />
    </View>
    <View style = {styles.container3}>
      <RNPickerSelect
        onValueChange={(value) => {
          setGender(value);
        }}
        items={[
          { label: 'Erkek', value: 'Erkek' },
          { label: 'Kadın', value: 'Kadın' },
        ]}
        placeholder={{ label: "Cinsiyetinizi Seçin", value: null }}
        style={{
          placeholder: {
            color: 'black',
            fontSize: 18,
          },
          inputIOS: {
            color: 'black',
            fontSize: 18,
          },
          inputAndroid: {
            color: 'black',
            fontSize: 18,
          },
        }}
      />
      </View>
      <View style={styles.container3}>
      <Button
        title="Doğum Tarihinizi Seçin"
        onPress={() => setShowDatePicker(true)}
        color="#3498db"
      />

      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={onDateChange}
        />
      )}

      <Text style={styles.selectedDate}>Doğum Tarihiniz: {date.toDateString()}</Text>
      </View>
      <View style={styles.container2}>
      <TouchableOpacity onPress={handleCheckboxToggle} style={styles.checkboxContainer}>
        {isChecked ? (
          <View style={styles.checkboxChecked} />
        ) : (
          <View style={styles.checkboxUnchecked} />
        )}
      </TouchableOpacity>
      
      <Text style={styles.text}>KVKK'ya Onay Veriyorum</Text>
    </View>
      
      <Button title="Kullanıcıyı Kaydet" onPress={handleRegister} />
      <Text style={styles.message}>{message}</Text>
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
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    padding: 8,
  },
  message: {
    marginTop: 16,
    color: 'green',
    fontSize: 16,
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 20,
  },
  pickerContainer: {
    marginTop: 20,
    width: '100%',
    height: '20%'
  },
  text: {
    alignItems: 'center',
    fontSize: 18,
    color: '#3498db',
  },

  container2: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    alignSelf: 'flex-start',
    marginBottom: 10,
    marginTop:5
  },
  container3: {
    alignItems: 'flex-start',
    alignSelf: 'flex-start',
    marginBottom: 10

  },
  checkboxContainer: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#3498db',
    borderRadius: 5,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    width: 14,
    height: 14,
    backgroundColor: '#3498db',
    borderRadius: 3,
  },
  checkboxUnchecked: {
    width: 14,
    height: 14,
    borderRadius: 3,
  },
});

export default Home;
