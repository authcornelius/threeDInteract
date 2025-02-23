import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { styles } from '../styles';

export default function Controls({ onMove }) {
  return (
    <View style={styles.controls}>
      <View style={styles.avatarControls}>
        <TouchableOpacity style={styles.button} onPress={() => onMove('left', 1)}>
          <Text>← Avatar 1</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => onMove('right', 1)}>
          <Text>Avatar 1 →</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => onMove('jump', 1)}>
          <Text>Jump Avatar 1</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.avatarControls}>
        <TouchableOpacity style={styles.button} onPress={() => onMove('left', 2)}>
          <Text>← Avatar 2</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => onMove('right', 2)}>
          <Text>Avatar 2 →</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => onMove('jump', 2)}>
          <Text>Jump Avatar 2</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
