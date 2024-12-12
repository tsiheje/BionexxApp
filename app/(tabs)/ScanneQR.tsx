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

    if (hasPermission === null) {
      return (
        <SafeAreaView style={styles.container}>
          <Text style={styles.errorText}>Demande d'autorisation caméra...</Text>
        </SafeAreaView>
      );
    }

    if (hasPermission === false) {
      return (
        <SafeAreaView style={styles.container}>
          <Text style={styles.errorText}>Aucun accès à la caméra</Text>
        </SafeAreaView>
      );
    }

    if (!scannedData) {
      return (
        <SafeAreaView style={styles.container}>
          <View style={styles.content}>
            <Text style={styles.title}>Scanner le QR code</Text>
            <View style={styles.cameraContainer}>
              <CameraView
                style={StyleSheet.absoluteFillObject}
                facing="back"
                onBarcodeScanned={handleBarcodeScan}
              >
                <View style={styles.cameraOverlay}>
                  <View style={styles.scannerFrame} />
                </View>
              </CameraView>
            </View>
          </View>
        </SafeAreaView>
      );
    }

    return (
      <SafeAreaView style={styles.container}>
        <ScrollView 
          contentContainerStyle={styles.resultsContainer}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.sectionTitle}>Informations du Cueilleur</Text>
            <View style={styles.profileAvatar}>
              <Ionicons name="person" size={50} color="white" />
            </View>
        
          <View style={styles.profileSection}>
              <View style={styles.profileDetails}>
                <Text style={styles.profileLabel}>Code</Text>
                <Text style={styles.profileValue}>C20100010</Text>
              </View>
              <View style={styles.profileDetails}>
                <Text style={styles.profileLabel}>Nom</Text>
                <Text style={styles.profileValue}>Rasolofoniaina Tsiheje</Text>
              </View>
              <View style={styles.profileDetails}>
                <Text style={styles.profileLabel}>Prénom</Text>
                <Text style={styles.profileValue}>Marie Mickaelio</Text>
              </View>
              <View style={styles.profileDetails}>
                <Text style={styles.profileLabel}>Téléphone</Text>
                <Text style={styles.profileValue}>0342341566</Text>
              </View>
          </View>

          <View style={styles.statsCard}>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Total Poids</Text>
              <Text style={styles.statValue}>500 kg</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Total Achat</Text>
              <Text style={styles.statValue}>500 000 Ar</Text>
            </View>
          </View>

          <TouchableOpacity 
            style={styles.primaryButton} 
            onPress={resetScanner}
          >
            <Ionicons name="scan" size={20} color="white" style={styles.buttonIcon} />
            <Text style={styles.buttonText}>Scanner à Nouveau</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#f0f4f8",
    },
    content: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: 20,
    },
    title: {
      fontSize: 28,
      fontWeight: "700",
      color: "#2c3e50",
      marginBottom: 20,
      textAlign: "center",
    },
    cameraContainer: {
      width: "100%",
      height: "65%",
      borderRadius: 25,
      overflow: "hidden",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 6,
      elevation: 8,
    },
    cameraOverlay: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    scannerFrame: {
      width: "80%",
      height: "50%",
      borderWidth: 2,
      borderColor: "rgba(255,255,255,0.7)",
      borderRadius: 20,
    },
    resultsContainer: {
      flexGrow: 1,
      alignItems: "center",
      paddingVertical: 30,
      paddingHorizontal: 20,
    },
    sectionTitle: {
      fontSize: 24,
      fontWeight: "700",
      color: "#2c3e50",
      marginBottom: 10,
      alignSelf: "flex-start",
    },
    profileSection: {
      flex: 1,
      width: "100%",
      backgroundColor: "white",
      borderRadius: 20,
      padding: 20,
      marginBottom: 15,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    profileAvatar: {
      width: 150,
      height: 150,
      borderRadius: 75,
      backgroundColor: "#3498db",
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 15,
    },
    profileDetails: {
      flex:1,
    },
    profileLabel: {
      fontSize: 14,
      color: "#7f8c8d",
      marginTop: 8,
    },
    profileValue: {
      fontSize: 16,
      fontWeight: "600",
      color: "#2c3e50",
      marginBottom: 8,
    },
    statsCard: {
      width: "100%",
      backgroundColor: "white",
      borderRadius: 20,
      flexDirection: "row",
      justifyContent: "space-between",
      padding: 20,
      marginBottom: 15,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    statItem: {
      alignItems: "center",
    },
    statLabel: {
      fontSize: 14,
      color: "#7f8c8d",
      marginBottom: 5,
    },
    statValue: {
      fontSize: 18,
      fontWeight: "700",
      color: "#2c3e50",
    },
    primaryButton: {
      width: "100%",
      backgroundColor: "#3498db",
      borderRadius: 15,
      paddingVertical: 15,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 3,
    },
    buttonIcon: {
      marginRight: 10,
    },
    buttonText: {
      color: "white",
      fontSize: 16,
      fontWeight: "600",
    },
    errorText: {
      color: "#e74c3c",
      textAlign: "center",
      fontSize: 16,
      padding: 20,
    },
  });