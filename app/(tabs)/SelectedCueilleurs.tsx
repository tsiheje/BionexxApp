import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Alert, TextInput, Button, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker'; 
import * as FileSystem from 'expo-file-system';

interface Cueilleur {
  id: number;
  name: string;
  type: string;
}

export default function SearchableCueilleurSelection() {
  const [selectedCueilleur, setSelectedCueilleur] = useState<string>('');  
  const [selectedType, setSelectedType] = useState<string>('principal');
  const [photo, setPhoto] = useState<string | null>(null);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [image, setImage] = useState<string | null>(null); 

  const requestCameraPermission = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    setHasPermission(status === 'granted');
  };

  const openCamera = async () => {
    if (hasPermission === null) {
      await requestCameraPermission();
      return;
    }

    if (hasPermission === false) {
      alert('Permission to access camera is required!');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets[0]) {
      setImage(result.assets[0].uri); 
    }
  };

  const handleSelectCueilleur = (text: string) => {
    setSelectedCueilleur(text);
  };

  const handleSelectType = (type: string) => {
    setSelectedType(type);
    setSelectedCueilleur(''); 
  };

  const savePhoto = async () => {
    if (image && typeof image === 'string') {  
      if (!selectedCueilleur) {
        Alert.alert('Erreur', 'Veuillez entrer un code de cueilleur.');
        return;
      }
  
      const prefix = selectedType === 'principal' ? 'P' : 'S'; 
      const fileName = `${prefix}_${selectedCueilleur}.jpg`; 
      const fileUri = FileSystem.documentDirectory + fileName; 
  
      try {
        await FileSystem.copyAsync({
          from: image,
          to: fileUri,
        });
        Alert.alert('Succès', `Image enregistrée sous le nom : ${fileName}`);
      } catch (error) {
        console.error('Erreur lors de l\'enregistrement de l\'image', error);
        Alert.alert('Erreur', 'Impossible d\'enregistrer l\'image.');
      }
    } else {
      Alert.alert('Aucune photo', 'Veuillez d\'abord prendre une photo.');
    }
  };
  

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Prendre une photo d'un cueilleur</Text>

        <View style={styles.card}>
          <View style={styles.typeSelectionContainer}>
            {['principal', 'secondaire'].map((type) => (
              <TouchableOpacity 
                key={type}
                style={[styles.typeButton, selectedType === type && styles.selectedTypeButton]}
                onPress={() => handleSelectType(type)}
              >
                <Text style={[styles.typeButtonText, selectedType === type && styles.selectedTypeButtonText]}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.selectContainer}>
            <TextInput
              value={selectedCueilleur}
              onChangeText={handleSelectCueilleur}
              placeholder="Entrez le code d'un cueilleur"
              style={styles.textInput}
            />
          </View>

          <View style={styles.cameraContainer}>
            <Button title="Ouvrir la caméra" onPress={openCamera} />
            {image && (
              <Image source={{ uri: image }} style={styles.image} />
            )}
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={savePhoto} style={styles.saveButton}>
              <Text style={styles.saveButtonText}>Enregistrer</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F9FC', 
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: 'Arial, sans-serif', 
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 8,
  },
  typeSelectionContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
    backgroundColor: '#F0F4F8', 
    borderRadius: 30,
    padding: 4,
  },
  typeButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 26,
    alignItems: 'center',
    margin: 4,
    backgroundColor: '#E9ECEF', 
  },
  selectedTypeButton: {
    backgroundColor: '#007bff', 
  },
  typeButtonText: {
    color: '#555',
    fontWeight: '600',
  },
  selectedTypeButtonText: {
    color: '#fff',
  },
  cameraContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  selectContainer: {
    marginBottom: 10,
  },
  textInput: {
    height: 45,
    borderColor: '#ccc',
    borderWidth: 1.5,
    borderRadius: 12,
    paddingLeft: 15,
    fontSize: 16,
    backgroundColor: '#F9FAFB', 
  },
  buttonContainer: {
    marginTop: 10,
    alignItems: 'center',
  },
  saveButton: {
    backgroundColor: '#28a745',
    paddingVertical: 14,
    paddingHorizontal: 45,
    borderRadius: 30,
    elevation: 4,
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 5 },
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  image: {
    width: 300,
    height: 300,
    marginTop: 10,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#ddd',
  },
});

