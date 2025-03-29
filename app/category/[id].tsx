import { useLocalSearchParams, useRouter } from 'expo-router';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { plantLibrary } from '../../lib/plantData';

export default function CategoryPage() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const plants = plantLibrary[id as string] || [];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🌿 {id}</Text>

      <FlatList
        data={plants}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => router.push(`/plant/${item.id}`)}
          >
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.info}>Полив: {item.water}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 12,
    borderRadius: 10,
    elevation: 2,
  },
  name: { fontSize: 18, fontWeight: '600' },
  info: { marginTop: 6, color: 'gray' },
});
