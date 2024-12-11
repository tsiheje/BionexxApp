import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Linking,
  ScrollView,
} from "react-native";
import { Camera, CameraView } from "expo-camera";
import { Ionicons } from "@expo/vector-icons";

export default function ScannerQR() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scannedData, setScannedData] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarcodeScan = (scanResult: { data: string }) => {
    // Store the scanned data
    setScannedData(scanResult.data);
  };

  const handleOpenLink = () => {
    if (scannedData) {
      Linking.openURL(scannedData);
    }
  };

  const resetScanner = () => {
    setScannedData(null);
  };

  // If permission is not granted
  if (hasPermission === null) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>Requesting camera permission...</Text>
      </SafeAreaView>
    );
  }

  if (hasPermission === false) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>No access to camera</Text>
      </SafeAreaView>
    );
  }

  // If no scan has happened yet
  if (!scannedData) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>Scanner le QRcode d'un cueilleur</Text>
          <View style={styles.cameraCard}>
            <CameraView
              style={StyleSheet.absoluteFillObject}
              facing="back"
              onBarcodeScanned={handleBarcodeScan}
            >
              <View style={styles.cameraOverlay}>
                {/* You can add additional camera overlay elements here */}
              </View>
            </CameraView>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.resultsContainer}>
        <Text style={styles.title}>Information du cueilleur</Text>
        <View style={styles.infocontent}>
          <View style={styles.infocard}>

          </View>
          <View>
            <Text>C20100010</Text>
            <Text>Rasolofoniaina</Text>
            <Text>Marie Mickaelio</Text>
            <Text>0342341566</Text>
          </View>
        </View>
        <View style={styles.resultCard}>
          <Text style={styles.resultLabel}>Total Poids</Text>
          <Text style={styles.resultText}>Total Achat</Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.scanAgainButton} 
            onPress={resetScanner}
          >
            <Text style={styles.buttonText}>Scanner à Nouveau</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin:-15,
    backgroundColor: "#f5f5f5",
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  infocontent: {
    width: "90%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
    marginBottom: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  infocard : {
    width: 100,
    height: 100,
    borderRadius : 50,
    backgroundColor: "red"
  },
  cameraCard: {
    width: "90%",
    height: "60%",
    overflow: "hidden",
    borderRadius: 20,
    backgroundColor: "#000",
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginTop: 20,
  },
  cameraOverlay: {
    flex: 1,
    backgroundColor: "transparent",
    flexDirection: "row",
    justifyContent: "flex-end",
    padding: 20,
  },
  resultsContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  resultsTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 30,
    color: "#333",
  },
  resultCard: {
    width: "90%",
    backgroundColor: "white",
    borderRadius: 15,
    padding: 20,
    marginBottom: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  resultLabel: {
    fontSize: 16,
    color: "#666",
    marginBottom: 10,
  },
  resultText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
  },
  openButton: {
    flex: 1,
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 10,
    marginRight: 10,
  },
  scanAgainButton: {
    flex: 1,
    backgroundColor: "#28a745",
    padding: 15,
    borderRadius: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
});