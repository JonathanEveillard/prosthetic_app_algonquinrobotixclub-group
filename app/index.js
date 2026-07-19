import React, { useState } from 'react';
import { StyleSheet, Text, View, StatusBar, TouchableOpacity, Share } from 'react-native';
import { Link } from 'expo-router'; 


import StatusIndicator from '../components/StatusIndicator';
import ActuatorSlider from '../components/ActuatorSlider';


import {Colors} from "../constants/Colors"
// import { Colors } from 'react-native/types_generated/Libraries/Animated/AnimatedExports';
export default function App() {
  const [value, setValue] = useState(0);

  // Sharing telemetry feed mock (native share panel)
  const handleCopy = async () => {
    try {
      await Share.share({
        message: `Actuator Feed: ${value}%`,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Centered Actuator Card */}
      <View style={styles.card}>
        
        {/* Connection status dot component */}
        <StatusIndicator label="STATUS" />
        
        {/* Main Title */}
        <Text style={styles.title}>ACTUATOR // CHANNEL 01</Text>

        {/* Reusable Slider Component (passes state & event down) */}
        <ActuatorSlider value={value} onChange={(val) => setValue(val)} />
           {/* 2. Place the Link inside the UI return block! */}
        
        <Link href="/calibration" style={styles.linkText}>
          Go to Calibration Screen
        </Link>

        {/* Raw Feed Output display */}
        <View style={styles.footer}>
          <Text style={styles.footerLabel}>RAW FEED VALUE</Text>
          <View style={styles.outputBox}>
            <Text style={styles.outputText}>{Math.round(value)}</Text>
            <TouchableOpacity style={styles.copyButton} onPress={handleCopy}>
              <Text style={styles.copyButtonText}>SHARE</Text>
            </TouchableOpacity>
          </View>
        </View>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background, // Space dark theme
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: 'rgba(13, 19, 36, 0.6',
    borderColor: 'rgba(255, 255, 255, 0.08)',
    borderWidth: 1,
    borderRadius: 16,
    padding: 24,
    width: '100%',
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 8,
  },
  title: {
    color: Colors.textLight,
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: 1.5,
    marginTop: 4,
  },
  footer: {
    borderTopColor: 'rgba(255, 255, 255, 0.05)',
    borderTopWidth: 1,
    paddingTop: 16,
  },
  footerLabel: {
    color: 'rgba(255, 255, 255, 0.3)',
    fontSize: 10,
    letterSpacing: 1,
    marginBottom: 8,
  },
  outputBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderColor: 'rgba(255, 255, 255, 0.03)',
    borderWidth: 1,
    padding: 12,
    borderRadius: 8,
  },
  outputText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
  copyButton: {
    backgroundColor: 'rgba(0, 243, 255, 0.08)',
    borderColor: 'rgba(0, 243, 255, 0.3)',
    borderWidth: 1,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
  },
  copyButtonText: {
    color: '#00f3ff',
    fontSize: 12,
    fontWeight: 'bold',
  },
});
