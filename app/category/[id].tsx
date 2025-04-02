import { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { getPlants } from '../../lib/trefle';
import { useRouter } from 'expo-router';


export default function CategoryPage() {
  const [plants, setPlants] = useState([]);
  const router = useRouter();


  useEffect(() => {
    (async () => {
      const data = await getPlants(1);
      setPlants(data);
    })();
  }, []);

  const renderPlant = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => router.push(`/plant/${item.id}`)}
    >
      {item.image_url ? (
        <Image source={{ uri: item.image_url }} style={styles.image} />
      ) : (
        <View style={styles.placeholder}>
          <Text style={{ color: '#999' }}>Нет изображения</Text>
        </View>
      )}
      <View style={styles.info}>
        <Text style={styles.name}>{item.common_name || 'Без имени'}</Text>
        <Text style={styles.scientific}>{item.scientific_name}</Text>
        <Text style={styles.more}>Подробнее →</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Растения</Text>
      <FlatList
        data={plants}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderPlant}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  card: {
    backgroundColor: '#fff',
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 180,
  },
  placeholder: {
    height: 180,
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
  },
  info: {
    padding: 12,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
  },
  scientific: {
    fontSize: 14,
    color: 'gray',
    marginTop: 4,
  },
  more: {
    color: 'green',
    marginTop: 10,
    fontWeight: 'bold',
  },
});
