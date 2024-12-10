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


export default function ScannerQR() {


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Scanner le QRcode d'un cueilleur</Text>
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
