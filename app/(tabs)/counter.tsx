import React, { useState, useEffect } from 'react';
import { StyleSheet, Alert } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function CounterScreen() {
  const [counter, setCounter] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchCounter = async () => {
    try {
      const response = await fetch('/api/counter');
      const data = await response.json();
      setCounter(data.counter);
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch counter');
    }
  };

  const updateCounter = async (action: 'increment' | 'decrement') => {
    if (loading) return;
    
    setLoading(true);
    try {
      const response = await fetch(`/api/counter/${action}`, {
        method: 'POST',
      });
      const data = await response.json();
      setCounter(data.counter);
    } catch (error) {
      Alert.alert('Error', `Failed to ${action} counter`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCounter();
  }, []);

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>
        Counter App
      </ThemedText>
      
      <ThemedView style={styles.counterContainer}>
        <ThemedText style={styles.counterValue}>
          {counter}
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.buttonContainer}>
        <ThemedView 
          style={[styles.button, loading && styles.buttonDisabled]}
          onTouchEnd={() => updateCounter('increment')}
        >
          <ThemedText style={styles.buttonText}>+1</ThemedText>
        </ThemedView>
        
        <ThemedView 
          style={[styles.button, loading && styles.buttonDisabled]}
          onTouchEnd={() => updateCounter('decrement')}
        >
          <ThemedText style={styles.buttonText}>-1</ThemedText>
        </ThemedView>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    marginBottom: 40,
  },
  counterContainer: {
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
    borderRadius: 20,
    padding: 40,
    marginBottom: 40,
    minWidth: 200,
    alignItems: 'center',
  },
  counterValue: {
    fontSize: 72,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 20,
  },
  button: {
    backgroundColor: '#007AFF',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 30,
    minWidth: 80,
    alignItems: 'center',
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
});