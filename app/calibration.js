import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import Svg, { Path, Line, Circle } from 'react-native-svg';
import { Colors } from '../constants/Colors';

const SCREEN_WIDTH = Dimensions.get('window').width;
const CHART_WIDTH = SCREEN_WIDTH - 48; // padding margin
const CHART_HEIGHT = 160;
const MAX_POINTS = 20; // Number of scrolling points on the graph

export default function CalibrationScreen() {
  const [dataPoints, setDataPoints] = useState(
    Array.from({ length: MAX_POINTS }, () => 50) // Initialize with middle values (50)
  );

  // Simulate real-time sensor feedback (like tension or pressure)
  useEffect(() => {
    const interval = setInterval(() => {
      setDataPoints((prevPoints) => {
        // Generate a new random sensor reading (simulating tension jitter)
        const lastPoint = prevPoints[prevPoints.length - 1];
        const change = (Math.random() - 0.5) * 15; // Jitter up or down
        let newPoint = lastPoint + change;
        
        // Keep value clamped between 10% and 90% for visual safety
        newPoint = Math.max(10, Math.min(90, newPoint));
        
        // Remove the oldest point and add the new point
        const nextPoints = [...prevPoints.slice(1), newPoint];
        return nextPoints;
      });
    }, 150); // Updates every 150ms

    return () => clearInterval(interval);
  }, []);

  // Convert array of data points [50, 45, 60...] into SVG path string "M 0 100 L 20 80..."
  const generatePath = () => {
    if (dataPoints.length === 0) return '';
    
    return dataPoints
      .map((val, index) => {
        // X coordinate: space points evenly across the width of the chart
        const x = (index / (MAX_POINTS - 1)) * CHART_WIDTH;
        // Y coordinate: Map 0-100 values to pixel heights (0 at top, height at bottom)
        const y = CHART_HEIGHT - (val / 100) * CHART_HEIGHT;
        
        return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
      })
      .join(' ');
  };

  const latestVal = Math.round(dataPoints[dataPoints.length - 1]);

  return (
    <View style={styles.container}>
      
      {/* Title */}
      <View style={styles.header}>
        <Text style={styles.title}>TELEMETRY MONITOR</Text>
        <Text style={styles.subtitle}>Real-time finger tension feedback (ADC)</Text>
      </View>

      {/* Numerical Feedback Widget */}
      <View style={styles.metricCard}>
        <Text style={styles.metricLabel}>SENSOR FEEDBACK</Text>
        <View style={styles.metricValueContainer}>
          <Text style={styles.metricNumber}>{latestVal}</Text>
          <Text style={styles.metricUnit}>gf (Grams-Force)</Text>
        </View>
      </View>

      {/* SVG Scrolling Chart Card */}
      <View style={styles.chartCard}>
        <View style={styles.chartTitleRow}>
          <View style={styles.liveIndicator}>
            <View style={styles.liveDot} />
            <Text style={styles.liveText}>LIVE FEED</Text>
          </View>
        </View>

        <View style={styles.chartWrapper}>
          <Svg width={CHART_WIDTH} height={CHART_HEIGHT}>
            
            {/* Grid Line: 50% threshold marker */}
            <Line
              x1="0"
              y1={CHART_HEIGHT / 2}
              x2={CHART_WIDTH}
              y2={CHART_HEIGHT / 2}
              stroke="rgba(255,255,255,0.08)"
              strokeWidth="1"
              strokeDasharray="4,4"
            />

            {/* Glowing path under-fill (simulating glow shadow) */}
            <Path
              d={generatePath()}
              fill="none"
              stroke="rgba(0, 243, 255, 0.15)"
              strokeWidth="6"
            />

            {/* Main graph line */}
            <Path
              d={generatePath()}
              fill="none"
              stroke="#00f3ff"
              strokeWidth="2.5"
            />

            {/* Glowing dot on the latest point */}
            <Circle
              cx={CHART_WIDTH}
              cy={CHART_HEIGHT - (dataPoints[dataPoints.length - 1] / 100) * CHART_HEIGHT}
              r="4"
              fill="#00f3ff"
            />
          </Svg>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 24,
    justifyContent: 'center',
  },
  header: {
    marginBottom: 24,
  },
  title: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: 1.5,
  },
  subtitle: {
    color: Colors.textMuted,
    fontSize: 11,
    marginTop: 4,
  },
  metricCard: {
    backgroundColor: Colors.cardBackground,
    borderColor: Colors.border,
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  metricLabel: {
    color: Colors.textMuted,
    fontSize: 9,
    fontWeight: 'bold',
    letterSpacing: 1,
    marginBottom: 4,
  },
  metricValueContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  metricNumber: {
    color: '#ffffff',
    fontSize: 32,
    fontWeight: '800',
  },
  metricUnit: {
    color: Colors.cyan,
    fontSize: 12,
    marginLeft: 6,
    fontWeight: '600',
  },
  chartCard: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderColor: Colors.border,
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    height: 220,
  },
  chartTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  liveIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#00f3ff',
    marginRight: 6,
  },
  liveText: {
    color: '#00f3ff',
    fontSize: 9,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  chartWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
