import { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import dayjs from 'dayjs';
import { useRouter } from 'expo-router';
import { useFocusEffect } from '@react-navigation/native';
import React from 'react';



export default function MyGarden() {
  const [plants, setPlants] = useState([]);
  const router = useRouter();

  useFocusEffect(
    React.useCallback(() => {
      const loadGarden = async () => {
        const stored = await AsyncStorage.getItem('myGarden');
        const parsed = stored ? JSON.parse(stored) : [];
        setPlants(parsed);
      };
  
      loadGarden();
    }, [])
  );
      

  const today = dayjs();

  const getStatusColor = (percent: number) => {
    if (percent >= 70) return '#4CAF50'; // зелёный
    if (percent >= 30) return '#FF9800'; // оранжевый
    return '#F44336'; // красный
  };

  const waterNow = async (plant) => {
    const updated = plants.map((p) =>
      p.id === plant.id
        ? {
            ...p,
            lastWatered: dayjs().format('YYYY-MM-DD'),
          }
        : p
    );
    setPlants(updated);
    await AsyncStorage.setItem('myGarden', JSON.stringify(updated));
    Alert.alert('💧 Полив выполнен', `${plant.name} полито сегодня`);
  };

  const renderItem = ({ item }) => {
    const last = dayjs(item.lastWatered);
    const next = last.add(item.wateringInterval || 3, 'day');
    const daysLeft = next.diff(today, 'day');
    const total = item.wateringInterval || 3;
    const waterLevel = Math.max(
      0,
      Math.min(100, ((total - daysLeft) / total) * 100)
    );

    return (
      <TouchableOpacity onPress={() => router.push(`/myplant/${item.id}`)}>
        <View style={styles.card}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.info}>
            Полив: {daysLeft <= 0 ? 'сегодня/опоздано' : `через ${daysLeft} дн.`}
          </Text>
          <View style={styles.barWrapper}>
            <View
              style={[
                styles.barFill,
                {
                  width: `${waterLevel}%`,
                  backgroundColor: getStatusColor(waterLevel),
                },
              ]}
            />
          </View>
          <TouchableOpacity
            style={styles.waterButton}
            onPress={() => waterNow(item)}
          >
            <Text style={styles.waterText}>💧 Полить сейчас</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🌿 My Garden</Text>
      <Text style={styles.subtitle}>Мои растения</Text>

      <FlatList
        data={plants}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        ListEmptyComponent={
          <Text style={{ color: 'gray', marginTop: 20 }}>
            Нет добавленных растений
          </Text>
        }
      />

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('/category/all')}
      >
        <Text style={styles.buttonText}>➕ Добавить растение</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.diaryButton}
        onPress={() => router.push('/care-log')}
      >
        <Text style={styles.buttonText}>📘 Открыть дневник</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f5fff5' },
  title: { fontSize: 26, fontWeight: 'bold', marginBottom: 16 },
  subtitle: { fontSize: 20, fontWeight: '600', marginTop: 10, marginBottom: 8 },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 14,
    elevation: 2,
  },
  name: { fontSize: 18, fontWeight: '600' },
  info: { color: 'gray', marginTop: 4 },
  barWrapper: {
    height: 10,
    backgroundColor: '#eee',
    borderRadius: 5,
    marginTop: 8,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    borderRadius: 5,
  },
  waterButton: {
    marginTop: 10,
    backgroundColor: '#2e7d32',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  waterText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  button: {
    marginTop: 20,
    backgroundColor: 'green',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  diaryButton: {
    marginTop: 12,
    backgroundColor: '#333',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
});
