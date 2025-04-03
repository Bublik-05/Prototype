import { useEffect, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import dayjs from 'dayjs';

export default function MyPlantDetail() {
  const { id } = useLocalSearchParams();
  const [plant, setPlant] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlant = async () => {
      const stored = await AsyncStorage.getItem('myGarden');
      const garden = stored ? JSON.parse(stored) : [];
      const current = garden.find((p) => p.id === id);
      setPlant(current);
      setLoading(false);
    };

    fetchPlant();
  }, [id]);

  const waterNow = async () => {
    const stored = await AsyncStorage.getItem('myGarden');
    const garden = stored ? JSON.parse(stored) : [];
    const updated = garden.map((p) =>
      p.id === plant.id ? { ...p, lastWatered: dayjs().format('YYYY-MM-DD') } : p
    );
    await AsyncStorage.setItem('myGarden', JSON.stringify(updated));
    setPlant(updated.find((p) => p.id === id));
    Alert.alert('Полив завершён', `${plant.name} полито сегодня!`);
  };

  if (loading || !plant) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="green" />
      </View>
    );
  }

  const last = dayjs(plant.lastWatered);
  const next = last.add(plant.wateringInterval || 3, 'day');
  const daysLeft = next.diff(dayjs(), 'day');
  const total = plant.wateringInterval || 3;
  const waterLevel = Math.max(0, Math.min(100, ((total - daysLeft) / total) * 100));

  return (
    <ScrollView style={styles.container}>
      {plant.image_url ? (
        <Image source={{ uri: plant.image_url }} style={styles.image} />
      ) : (
        <View style={styles.placeholder}><Text>Нет изображения</Text></View>
      )}

      <View style={styles.info}>
        <Text style={styles.name}>{plant.common_name || plant.name}</Text>
        <Text style={styles.scientific}>{plant.scientific_name || ''}</Text>
        <Text style={styles.detail}>Последний полив: {last.format('DD.MM.YYYY')}</Text>
        <Text style={styles.detail}>Следующий полив: {next.format('DD.MM.YYYY')}</Text>
        <Text style={styles.detail}>Осталось дней: {daysLeft <= 0 ? 'нужно полить!' : daysLeft}</Text>

        <View style={styles.barWrapper}>
          <View
            style={[styles.barFill, {
              width: `${waterLevel}%`,
              backgroundColor: waterLevel >= 70 ? '#4CAF50' : waterLevel >= 30 ? '#FF9800' : '#F44336',
            }]}
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={waterNow}>
          <Text style={styles.buttonText}>💧 Полить сейчас</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  image: { width: '100%', height: 220 },
  placeholder: {
    height: 220,
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
  },
  info: { padding: 20 },
  name: { fontSize: 24, fontWeight: 'bold' },
  scientific: { fontSize: 16, fontStyle: 'italic', color: 'gray', marginBottom: 10 },
  detail: { fontSize: 16, marginBottom: 6 },
  barWrapper: {
    height: 10,
    backgroundColor: '#ddd',
    borderRadius: 5,
    overflow: 'hidden',
    marginTop: 10,
  },
  barFill: {
    height: '100%',
    borderRadius: 5,
  },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  button: {
    marginTop: 20,
    backgroundColor: 'green',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});