import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  TextInput,
  Image,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import { Camera, Image as ImageIcon, X } from "lucide-react-native";
import logo from "../assets/images/logo_bxx.png";

export default function SearchableCueilleurSelection() {
  const [selectedCueilleur, setSelectedCueilleur] = useState<string>("");
  const [selectedType, setSelectedType] = useState<string>("principal");
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [image, setImage] = useState<string | null>(null);

  const requestCameraPermission = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    setHasPermission(status === "granted");
  };

  const openCamera = async () => {
    if (hasPermission === null) {
      await requestCameraPermission();
      return;
    }

    if (hasPermission === false) {
      alert("Permission to access camera is required!");
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
    setSelectedCueilleur("");
  };

  const saveToGallery = async () => {
    if (image) {
      if (!selectedCueilleur) {
        Alert.alert("Oups !", "Veuillez entrer le code du cueilleur.");
        return;
      }

      const prefix = selectedType === "principal" ? "P" : "S";
      const fileName = `${prefix} ${selectedCueilleur}.jpg`;
      const fileUri = FileSystem.cacheDirectory + fileName;

      try {
        await FileSystem.copyAsync({
          from: image,
          to: fileUri,
        });

        const permission = await MediaLibrary.requestPermissionsAsync();
        if (permission.granted) {
          const asset = await MediaLibrary.createAssetAsync(fileUri);
          await MediaLibrary.createAlbumAsync("BionexxApp", asset, false);
          Alert.alert(
            "Succès",
            `Photo enregistrée dans la galerie sous le nom : ${fileName}`
          );
          setImage(null);
          setSelectedCueilleur("");
        } else {
          Alert.alert(
            "Permission refusée",
            "Vous devez autoriser l'accès à la galerie."
          );
        }
      } catch (error) {
        console.error("Erreur lors de l'enregistrement dans la galerie", error);
        Alert.alert(
          "Erreur",
          "Impossible d'enregistrer la photo dans la galerie."
        );
      }
    } else {
      Alert.alert("Aucune photo", "Veuillez d'abord prendre une photo.");
    }
  };

  const clearImage = () => {
    setImage(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Image source={logo} style={styles.logo} />
        <Text style={styles.title}>Prendre une photo d'un cueilleur</Text>

        <View style={styles.card}>
          <View style={styles.typeSelectionContainer}>
            {["principal", "secondaire"].map((type) => (
              <TouchableOpacity
                key={type}
                style={[
                  styles.typeButton,
                  selectedType === type && styles.selectedTypeButton,
                ]}
                onPress={() => handleSelectType(type)}
              >
                <Text
                  style={[
                    styles.typeButtonText,
                    selectedType === type && styles.selectedTypeButtonText,
                  ]}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              value={selectedCueilleur}
              onChangeText={handleSelectCueilleur}
              placeholder="Entrez le code du cueilleur"
              style={styles.textInput}
              placeholderTextColor="#888"
              maxLength={9}
            />
          </View>

          <TouchableOpacity
            style={styles.cameraCard}
            onPress={image ? undefined : openCamera}
          >
            {image ? (
              <View style={styles.imageContainer}>
                <Image
                  source={{ uri: image }}
                  style={styles.capturedImage}
                  resizeMode="cover"
                />
                <TouchableOpacity
                  style={styles.clearImageButton}
                  onPress={clearImage}
                >
                  <X color="#fff" size={20} />
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.cameraPlaceholder}>
                <Camera color="#007bff" size={50} />
                <Text style={styles.cameraPlaceholderText}>
                  Appuyez pour prendre une photo
                </Text>
              </View>
            )}
          </TouchableOpacity>

          {image && (
            <TouchableOpacity onPress={saveToGallery} style={styles.saveButton}>
              <ImageIcon color="#fff" size={20} />
              <Text style={styles.saveButtonText}>Enregistrer</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f6f9",
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  logo: {
    width: 130,
    height: 130,
    resizeMode: "contain",
    alignSelf: "center",
    marginBottom: 0,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#2c3e50",
    marginBottom: 25,
    textAlign: "center",
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 15,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
  },
  typeSelectionContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
    backgroundColor: "#f0f4f8",
    borderRadius: 10,
    padding: 4,
  },
  typeButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    margin: 4,
    backgroundColor: "#e9ecef",
  },
  selectedTypeButton: {
    backgroundColor: "#669D31",
  },
  typeButtonText: {
    color: "#000",
    fontWeight: "600",
  },
  selectedTypeButtonText: {
    color: "#fff",
  },
  inputContainer: {
    marginBottom: 20,
  },
  textInput: {
    height: 50,
    borderColor: "#e0e0e0",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: "#f9fafb",
  },
  cameraCard: {
    backgroundColor: "#f0f4f8",
    borderRadius: 15,
    height: 300,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    overflow: "hidden",
  },
  cameraPlaceholder: {
    justifyContent: "center",
    alignItems: "center",
  },
  cameraPlaceholderText: {
    marginTop: 15,
    color: "#4D5156",
    fontSize: 16,
  },
  imageContainer: {
    width: "100%",
    height: "100%",
    position: "relative",
  },
  capturedImage: {
    width: "100%",
    height: "100%",
  },
  clearImageButton: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 20,
    padding: 5,
  },
  saveButton: {
    flexDirection: "row",
    backgroundColor: "#666664",
    paddingVertical: 15,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#007bff",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 10,
  },
});
