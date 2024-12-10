import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';

// Custom TextInput Component
type MyTxtInputProps = {
  placeholder: string;
  isPassword: boolean;
};

function MyTxtInput({
  placeholder,
  isPassword,
}: MyTxtInputProps): React.JSX.Element {
  const [inputVal, setInputVal] = useState('');

  const handleChangeTxt = (newTxt: string) => {
    console.log(`txt changed: ${newTxt}`);
    setInputVal(newTxt); // Update the state
  };

  return (
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      placeholderTextColor="#888"
      secureTextEntry={isPassword}
      onChangeText={handleChangeTxt}
      value={inputVal}
    />
  );
}

// Login Component
const Login = () => {
  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image style={styles.logo} source={require('../img/logo.png')} />

      {/* Inputs */}
      <MyTxtInput placeholder="Email" isPassword={false} />
      <MyTxtInput placeholder="Password" isPassword={true} />

      {/* Login Button */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    padding: 20,
  },
  logo: {
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    borderColor: '#ccc',
    borderWidth: 1,
    fontSize: 16,
    color: '#333',
  },
  button: {
    width: '30%',
    height: 50,
    backgroundColor: '#0090A8',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    marginTop: 10,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default Login;
