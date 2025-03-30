import { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import dayjs from 'dayjs';
import { useRouter } from 'expo-router';

const initialPlants = [
  {
    id: '1',
    name: 'Фикус',
    lastWatered: '2025-03-28',
    wateringInterval: 3,
  },
  {
    id: '2',
    name: 'Роза',
    lastWatered: '2025-03-29',
    wateringInterval: 2,
  },
];

export default function MyGarden() {
  const [plants, setPlants] = useState(initialPlants);
  const router = useRouter();

  const today = dayjs();

  const getDaysUntilWater = (plant: typeof plants[0]) => {
    const nextWater = dayjs(plant.lastWatered).add(plant.wateringInterval, 'day');
    return nextWater.diff(today, 'day');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🌿 My Garden</Text>

      <Text style={styles.subtitle}>Мои растения</Text>
      <FlatList
        data={plants}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const days = getDaysUntilWater(item);
          return (
            <TouchableOpacity onPress={() => router.push(`/plant/${item.id}`)}>
              <View style={styles.card}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.info}>
                  Полив: {days === 0 ? 'сегодня' : days > 0 ? `через ${days} дн.` : `опоздано на ${-days} дн.`}
                </Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />

      <TouchableOpacity style={styles.button}
        onPress={() => router.push('/category/all')}>
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
  subtitle: { fontSize: 20, fontWeight: '600', marginTop: 20, marginBottom: 8 },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
  },
  name: { fontSize: 18, fontWeight: '600' },
  info: { color: 'gray', marginTop: 4 },
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
