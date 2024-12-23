import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
  ActivityIndicator,
} from "react-native";
import { Camera, CameraView } from "expo-camera";
import { Ionicons } from "@expo/vector-icons";
import CueilleurService from "../../config/api/MobileService"; 
import logo from "../../assets/images/logo_bxx.png";

export default function ScannerQR() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scannedData, setScannedData] = useState<string | null>(null);
  const [cueilleurInfo, setCueilleurInfo] = useState<any | null>(null); 
  const [loading, setLoading] = useState<boolean>(false); 
  const [error, setError] = useState<string | null>(null); 

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarcodeScan = async (scanResult: { data: string }) => {
    setScannedData(scanResult.data);
    setLoading(true);
    setError(null);

    try {
      const data = await CueilleurService.getInfoCueilleur(scanResult.data); 
      setCueilleurInfo(data);
    } catch (err) {
      setError("Impossible de récupérer les informations du cueilleur.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const resetScanner = () => {
    setScannedData(null);
    setCueilleurInfo(null);
    setError(null);
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

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#3498db" />
        <Text>Chargement des informations...</Text>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.primaryButton} onPress={resetScanner}>
          <Ionicons name="scan" size={20} color="white" style={styles.buttonIcon} />
          <Text style={styles.buttonText}>Réessayer</Text>
        </TouchableOpacity>
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
        {cueilleurInfo && (
          <>
            <View style={styles.profileAvatar}>
              <Ionicons name="person" size={50} color="white" />
            </View>

            <View style={styles.profileSection}>
              <View style={styles.profileDetails}>
                <Text style={styles.profileLabel}>Code</Text>
                <Text style={styles.profileValue}>{cueilleurInfo.cueilleurPrincipal?.code_cp || "N/A"}</Text>
              </View>
              <View style={styles.profileDetails}>
                <Text style={styles.profileLabel}>Nom</Text>
                <Text style={styles.profileValue}>{cueilleurInfo.cueilleurPrincipal?.nom || "N/A"}</Text>
              </View>
              <View style={styles.profileDetails}>
                <Text style={styles.profileLabel}>Prénom</Text>
                <Text style={styles.profileValue}>{cueilleurInfo.cueilleurPrincipal?.prenoms || "N/A"}</Text>
              </View>
              <View style={styles.profileDetails}>
                <Text style={styles.profileLabel}>Surnom</Text>
                <Text style={styles.profileValue}>{cueilleurInfo.cueilleurPrincipal?.surnoms || "N/A"}</Text>
              </View>
            </View>

            <View style={styles.statsCard}>
              <View style={styles.statItem}>
                <Text style={styles.statLabel}>Total Poids</Text>
                <Text style={styles.statValue}>{cueilleurInfo.totalPoids || 0} kg</Text>
              </View>
            </View>
          </>
        )}

        <TouchableOpacity style={styles.primaryButton} onPress={resetScanner}>
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