// app/_layout.js
import { Tabs } from 'expo-router';
import { Colors } from '../constants/Colors';

export default function Layout() {
  return (
    <Tabs
      screenOptions={{
        // Hide the top white header
        headerShown: false,
        
        // Style the bottom tab bar (dark background to match our theme)
        tabBarStyle: {
          backgroundColor: '#0d1324',
          borderTopColor: Colors.border,
          height: 60,
          paddingBottom: 8,
        },
        
        // Active color (when selected) is Cyan, inactive is muted text
        tabBarActiveTintColor: Colors.cyan,
        tabBarInactiveTintColor: Colors.textMuted,
      }}
    >
      {/* Configure the first tab (Home/Index) */}
      <Tabs.Screen
        name="index"
        options={{
          title: 'Controls', // Label shown on the tab button
        }}
      />
      
      {/* Configure the second tab (Calibration) */}
      <Tabs.Screen
        name="calibration"
        options={{
          title: 'Calibration', // Label shown on the tab button
        }}
      />
    </Tabs>
  );
}