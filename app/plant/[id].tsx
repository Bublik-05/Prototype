import { View, Text, StyleSheet, Image, ProgressBarAndroid, Platform } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

// заглушка данных (в будущем можно брать из базы или из параметров)
const plantData = {
  name: 'Фикус',
  image: null, // пока нет картинки
  wateringInterval: 3,
  lastWatered: '2025-03-28',
  currentWaterLevel: 0.5, // от 0 до 1
};

import dayjs from 'dayjs';

export default function PlantDetail() {
  const { id } = useLocalSearchParams();
  const today = dayjs();
  const nextWaterDate = dayjs(plantData.lastWatered).add(plantData.wateringInterval, 'day');
  const daysUntilWater = nextWaterDate.diff(today, 'day');

  const statusIcon = daysUntilWater > 0 ? '✅' : '💧';

  return (
    <View style={styles.container}>
      {/* Фото растения (заглушка) */}
      <View style={styles.imagePlaceholder}>
        <Text style={{ color: '#888' }}>Фото растения</Text>
        {/* Здесь позже будет <Image source={{ uri: plantData.image }} /> */}
      </View>

      <Text style={styles.name}>{plantData.name}</Text>

      {/* Таймер */}
      <Text style={styles.timer}>
        {daysUntilWater > 0
          ? `Полив через ${daysUntilWater} дн.`
          : daysUntilWater === 0
          ? 'Полить сегодня!'
          : `Просрочен: ${-daysUntilWater} дн.`}
      </Text>

      {/* Уровень воды */}
      <Text style={styles.sectionTitle}>Уровень воды</Text>
      {Platform.OS === 'android' ? (
        <ProgressBarAndroid
          styleAttr="Horizontal"
          indeterminate={false}
          progress={plantData.currentWaterLevel}
          color="green"
          style={styles.progressBar}
        />
      ) : (
        <View style={styles.progressBarFallback}>
          <View
            style={{
              backgroundColor: 'green',
              width: `${plantData.currentWaterLevel * 100}%`,
              height: '100%',
              borderRadius: 8,
            }}
          />
        </View>
      )}

      {/* Статус полива */}
      <Text style={styles.statusIcon}>{statusIcon}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f8fff8' },
  imagePlaceholder: {
    backgroundColor: '#e0e0e0',
    height: 180,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  name: { fontSize: 26, fontWeight: 'bold', marginBottom: 10 },
  timer: { fontSize: 18, marginBottom: 20 },
  sectionTitle: { fontSize: 16, fontWeight: '500', marginBottom: 4 },
  progressBar: { height: 10, borderRadius: 10, marginBottom: 20 },
  progressBarFallback: {
    height: 10,
    backgroundColor: '#ccc',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 20,
  },
  statusIcon: {
    fontSize: 40,
    textAlign: 'center',
    marginTop: 30,
  },
});
