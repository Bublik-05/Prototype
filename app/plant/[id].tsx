import { useEffect, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Image } from 'react-native';
import { getPlantDetails } from '../../lib/trefle';
import { plantLibrary } from '../../lib/plantData';

export default function PlantPage() {
  const { id } = useLocalSearchParams();
  const [plant, setPlant] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const isLocalPlant = typeof id === 'string' && isNaN(Number(id));

    const fetchData = async () => {
      if (isLocalPlant) {
        // ищем в plantLibrary
        const allPlants = Object.values(plantLibrary).flat();
        const localPlant = allPlants.find((p) => p.id === id);
        setPlant(localPlant || null);
        setLoading(false);
      } else {
        // загружаем с Trefle
        const data = await getPlantDetails(id);
        setPlant(data);
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

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
        <Text>Ошибка загрузки растения</Text>
      </View>
    );
  }

  const isLocal = plant?.description !== undefined;

  return (
    <ScrollView style={styles.container}>
      {plant.image_url ? (
        <Image source={{ uri: plant.image_url }} style={styles.image} />
      ) : (
        <View style={styles.placeholder}><Text>Нет изображения</Text></View>
      )}

      <View style={styles.info}>
        <Text style={styles.name}>{plant.common_name || plant.name || 'Без имени'}</Text>
        <Text style={styles.scientific}>{plant.scientific_name || ''}</Text>
        {isLocal ? (
        <>
          <Text style={styles.detail}>Полив: {plant.water}</Text>
          <Text style={styles.detail}>Советы: {plant.tips}</Text>
          <Text style={styles.detail}>{plant.description}</Text>
        </> 
      ) : (
        <>
          <Text style={styles.detail}>Семейство: {String(plant.family?.name || '-')}</Text>
          <Text style={styles.detail}>Род: {String(plant.genus?.name || '-')}</Text>
          <Text style={styles.detail}>Вид: {String(plant.slug?.name || '-')}</Text>
        </>
      )}

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  image: { width: '100%', height: 200 },
  placeholder: {
    height: 200,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
  },
  info: { padding: 20 },
  name: { fontSize: 24, fontWeight: 'bold' },
  scientific: { fontSize: 16, fontStyle: 'italic', marginBottom: 10 },
  detail: { fontSize: 16, marginBottom: 6 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
