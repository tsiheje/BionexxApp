  import React, { useState, useEffect } from "react";
  import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
    Linking,
    ScrollView,
    Image,
  } from "react-native";
  import { Camera, CameraView } from "expo-camera";
  import { Ionicons } from "@expo/vector-icons";
  import logo from "../../assets/images/logo_bxx.png";

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
          <Image source={logo} style={styles.logo} />
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
      backgroundColor: "#f4f6f9", 
    },
    logo: {
      width: 140, 
      height: 140,
      resizeMode: "contain",
      alignSelf: "center",
      marginTop: 20,
    },
    content: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: 25,
    },
    title: {
      fontSize: 32, 
      fontWeight: "700",
      color: "#1a2f3a",
      marginBottom: 25,
      textAlign: "center",
      letterSpacing: 0.5, 
    },
    cameraContainer: {
      width: "100%",
      height: "80%",
      borderRadius: 25, 
      overflow: "hidden",
      backgroundColor: "rgba(255,255,255,0.8)",
      shadowColor: "#1a2f3a",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 8,
      elevation: 10,
    },
    cameraOverlay: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "rgba(26, 47, 58, 0.1)", 
    },
    scannerFrame: {
      width: "75%",
      height: "45%",
      borderWidth: 3,
      borderColor: "rgba(255,255,255,0.8)",
      borderRadius: 25,
      borderStyle: "dashed", 
    },
    resultsContainer: {
      flexGrow: 1,
      alignItems: "center",
      paddingVertical: 30,
      paddingHorizontal: 20,
    },
    sectionTitle: {
      fontSize: 26,
      fontWeight: "700",
      color: "#1a2f3a",
      marginBottom: 15,
      letterSpacing: 0.5,
    },
    profileSection: {
      width: "100%",
      borderRadius: 25,
      padding: 25,
      marginBottom: 20,
      alignItems: "center",
      shadowColor: "#1a2f3a",
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.1,
      shadowRadius: 6,
      elevation: 5,
      backgroundColor: "rgba(255,255,255,0.9)",
    },
    profileAvatar: {
      width: 120, 
      height: 120,
      borderRadius: 60,
      backgroundColor: "#3498db",
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 20,
      shadowColor: "#3498db",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 6,
      elevation: 8,
    },
    profileDetails: {
      width: "100%",
      marginBottom: 10,
      paddingHorizontal: 10,
    },
    profileLabel: {
      fontSize: 14,
      color: "#5a6f7a", 
      marginBottom: 5,
      textTransform: "uppercase", 
      letterSpacing: 1,
    },
    profileValue: {
      fontSize: 18,
      fontWeight: "600",
      color: "#1a2f3a",
      paddingBottom: 10,
      borderBottomWidth: 1,
      borderBottomColor: "rgba(26, 47, 58, 0.1)", 
    },
    statsCard: {
      width: "100%",
      borderRadius: 25,
      flexDirection: "row",
      justifyContent: "space-between",
      padding: 25,
      marginBottom: 20,
      shadowColor: "#1a2f3a",
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.1,
      shadowRadius: 6,
      elevation: 5,
      backgroundColor: "rgba(255,255,255,0.9)",
    },
    statItem: {
      alignItems: "center",
      flex: 1,
    },
    statLabel: {
      fontSize: 14,
      color: "#5a6f7a",
      marginBottom: 8,
      textTransform: "uppercase",
      letterSpacing: 1,
    },
    statValue: {
      fontSize: 20,
      fontWeight: "700",
      color: "#1a2f3a",
    },
    primaryButton: {
      width: "100%",
      backgroundColor: "#2ecc71", 
      borderRadius: 25,
      paddingVertical: 18,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      shadowColor: "#2ecc71",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 6,
      elevation: 6,
    },
    buttonIcon: {
      marginRight: 12,
    },
    buttonText: {
      color: "white",
      fontSize: 18,
      fontWeight: "600",
      letterSpacing: 0.5,
    },
    errorText: {
      color: "#e74c3c",
      textAlign: "center",
      fontSize: 18,
      padding: 25,
      fontWeight: "500",
    },
  });