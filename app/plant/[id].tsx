import { useEffect, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Image,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { getPlantDetails } from '../../lib/trefle';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function PlantPage() {
  const { id, local } = useLocalSearchParams();
  const [plant, setPlant] = useState(null);
  const [loading, setLoading] = useState(true);

  const isLocal = !!local;

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (isLocal) {
          const parsed = JSON.parse(local as string);
          setPlant(parsed);
        } else {
          const data = await getPlantDetails(id);
          setPlant(data);
        }
      } catch (err) {
        console.error('Ошибка загрузки:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const addToGarden = async () => {
    try {
      const existing = await AsyncStorage.getItem('myGarden');
      const garden = existing ? JSON.parse(existing) : [];

      const alreadyExists = garden.find((item: any) => item.id === plant.id);
      if (alreadyExists) {
        Alert.alert('Это растение уже есть в твоём саду 🌿');
        return;
      }

      const enrichedPlant = {
        ...plant,
        lastWatered: new Date().toISOString().slice(0, 10), // YYYY-MM-DD
        wateringInterval: 3, // по умолчанию
      };

      garden.push(enrichedPlant);
      await AsyncStorage.setItem('myGarden', JSON.stringify(garden));
      Alert.alert('✅ Успешно', 'Добавлено в My Garden!');
    } catch (error) {
      console.error('Ошибка при добавлении:', error);
      Alert.alert('❌ Ошибка', 'Не удалось сохранить');
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="green" />
      </View>
    );
  }

  if (!plant) {
    return (
      <View style={styles.center}>
        <Text>Растение не найдено</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {plant.image_url ? (
        <Image source={{ uri: plant.image_url }} style={styles.image} />
      ) : (
        <View style={styles.placeholder}>
          <Text>Нет изображения</Text>
        </View>
      )}

      <View style={styles.info}>
        <Text style={styles.name}>{plant.common_name || plant.name || 'Без имени'}</Text>
        <Text style={styles.scientific}>{plant.scientific_name || ''}</Text>

        {isLocal ? (
          <>
            <Text style={styles.detail}>Полив: {plant.water || 'по необходимости'}</Text>
            <Text style={styles.detail}>Советы: {plant.tips || 'нет'}</Text>
            <Text style={styles.detail}>{plant.description || ''}</Text>
          </>
        ) : (
          <>
            <Text style={styles.detail}>Семейство: {plant.family?.name || '-'}</Text>
            <Text style={styles.detail}>Род: {plant.genus?.name || '-'}</Text>
            <Text style={styles.detail}>Вид: {plant.slug || '-'}</Text>
          </>
        )}
      </View>

      <TouchableOpacity style={styles.addButton} onPress={addToGarden}>
        <Text style={styles.addText}>➕ Добавить в My Garden</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fefefe' },
  image: { width: '100%', height: 220 },
  placeholder: {
    height: 220,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
  },
  info: { padding: 20 },
  name: { fontSize: 24, fontWeight: 'bold', marginBottom: 4 },
  scientific: { fontSize: 16, fontStyle: 'italic', color: '#666', marginBottom: 10 },
  detail: { fontSize: 16, marginBottom: 6 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  addButton: {
    backgroundColor: 'green',
    margin: 20,
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
  },
  addText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
