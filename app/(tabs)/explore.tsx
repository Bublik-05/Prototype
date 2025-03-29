import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

const plantCategories = [
  { id: 'flowering', title: 'Цветущие', icon: '🌸', count: 12 },
  { id: 'succulents', title: 'Суккуленты', icon: '🌵', count: 8 },
  { id: 'tropical', title: 'Тропические', icon: '🌴', count: 5 },
  { id: 'leafy', title: 'Лиственные', icon: '🍃', count: 10 },
  { id: 'ampel', title: 'Ампельные', icon: '🌿', count: 6 },
  { id: 'all', title: 'Смотреть все', icon: '🔍' },
];

export default function ExploreScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🌱 Категории растений</Text>

      <FlatList
        data={plantCategories}
        numColumns={2}
        columnWrapperStyle={styles.row}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => router.push(`/category/${item.id}`)}
          >
            <Text style={styles.icon}>{item.icon}</Text>
            <Text style={styles.name}>{item.title}</Text>
            {item.count && <Text style={styles.count}>{item.count}</Text>}
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f7fdf8' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  row: { justifyContent: 'space-between' },
  card: {
    backgroundColor: '#fff',
    width: '48%',
    borderRadius: 12,
    paddingVertical: 24,
    alignItems: 'center',
    marginBottom: 16,
    elevation: 2,
  },
  icon: { fontSize: 36 },
  name: { fontSize: 18, fontWeight: '500', marginTop: 8 },
  count: { fontSize: 14, color: 'gray', marginTop: 4 },
});
