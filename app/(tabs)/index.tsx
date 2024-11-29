import React, { useState, useEffect } from "react";
import { Image, StyleSheet, View } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import SelectedCueilleurs from "./SelectedCueilleurs";

export default function HomeScreen() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  if (isLoading) {
    return (
      <View style={[styles.loadingContainer]}>
        <Image
          source={require("@/assets/images/logo_bxx.png")}
          style={styles.reactLogo}
        />
      </View>
    );
  }

  return (
    <ThemedView style={styles.mainContainer}>
      <SelectedCueilleurs />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#038a1b",
  },
  reactLogo: {
    height: 120,
    width: 200,
    resizeMode: "contain",
  },
  mainContainer: {
    flex: 1,
    backgroundColor: "#e0f7fa",
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
});
