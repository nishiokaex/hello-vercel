import React, { useState, useEffect } from 'react';
import { StyleSheet, Alert, Button } from 'react-native';
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
        <Button 
          title="+1"
          onPress={() => updateCounter('increment')}
        />
        
        <Button 
          title="-1"
          onPress={() => updateCounter('decrement')}
        />
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
});