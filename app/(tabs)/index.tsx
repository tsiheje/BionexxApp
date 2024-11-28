import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, View, Text, Platform } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import SelectedCueilleurs from './SelectedCueilleurs';
import CameraComponent from './CameraComponents';

export default function HomeScreen() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);  
    }, 3000);
  }, []);

  if (isLoading) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: '#f0f0f0' }]}>
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      </View>
    );
  }

  return (
    <ThemedView style={styles.mainContainer}>
      <SelectedCueilleurs/>
      {/* <CameraComponent/> */}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  mainContainer: {
    flex: 1,
    backgroundColor: '#e0f7fa',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
});
