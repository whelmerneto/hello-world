import React from 'react';
import { AppRegistry, Alert, TouchableOpacity, Image, StyleSheet, Text, View } from 'react-native';
import logo from './assets/logo.png'; 
import * as ImagePicker from 'expo-image-picker';

export default function App() {
  const [selectedImage, setSelectedImage] = React.useState(null);

   let openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    if (pickerResult.cancelled === true) {
      return;
    }

    setSelectedImage({ localUri: pickerResult.uri });
  };

  if (selectedImage !== null) {
    return (
      <View style={styles.container}>
        <Image
          source={{ uri: selectedImage.localUri }}
          style={styles.thumbnail}
        />
      </View>
    );
  }
  return (
    <View style={styles.container}>
    <Image source={logo} style={styles.logo} /> 
    <Text  style={styles.instructions}> To start sharing photos, tap the button below.</Text>

     <TouchableOpacity onPress={openImagePickerAsync} style={styles.button}>
        <Text style={styles.buttonText}>Pick a photo</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
   logo: {
    width: 400,
    height: 400,
    marginBottom: -80,
    marginHorizontal: 20,
    margin: -90,
    borderRadius: 30,
  },
  instructions: {
    color: '#888',
    fontSize: 18,
    marginHorizontal: 20,
    marginBottom: 15,
  }, 
  button: {
    backgroundColor: "#100",
    padding: 12,
    borderRadius: 240,
  },
  buttonText: {
    fontSize: 15,
    color: '#fff',
  }, 
    thumbnail: {
    width: 300,
    height: 300,
    resizeMode: "contain"
  }
});