import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  Linking,
} from "react-native";
import { Camera, CameraView } from "expo-camera";
import { Ionicons } from "@expo/vector-icons";

export default function ScannerQR() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);
  const [facing, setFacing] = useState<"back" | "front">("back");

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }: { type: string; data: string }) => {
    setScanned(true);
    Alert.alert(
      "QR Code Scanned",
      `Type: ${type}\nContent: ${data}`,
      [
        {
          text: "OK",
          onPress: () => setScanned(false),
        },
      ]
    );
  };

  const toggleCameraFacing = () => {
    setFacing((current) => (current === "back" ? "front" : "back"));
  };

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

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Scanner le QRcode d'un cueilleur</Text>
        <View style={styles.cameraCard}>
          <CameraView
            style={StyleSheet.absoluteFillObject}
            facing="back"
            onBarcodeScanned={({data})=> {
              Linking.openURL(data)
            }}
          >
            <View style={styles.cameraOverlay}>
            </View>
          </CameraView>
        </View>
        {scanned && (
          <TouchableOpacity style={styles.saveButton} onPress={() => setScanned(false)}>
            <Text style={styles.saveButtonText}>Scan Again</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  cameraToggleButton: {
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 30,
    padding: 10,
  },
  saveButton: {
    marginTop: 20,
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 10,
  },
  saveButtonText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
});
