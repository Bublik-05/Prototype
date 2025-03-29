import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';

const plantCategories = [
  { id: 'flowering', title: 'Цветущие', icon: '🌸', count: 12 },
  { id: 'succulents', title: 'Суккуленты', icon: '🌵', count: 8 },
  { id: 'tropical', title: 'Тропические', icon: '🌴', count: 5 },
  { id: 'leafy', title: 'Лиственные', icon: '🍃', count: 10 },
  { id: 'ampel', title: 'Ампельные', icon: '🌿', count: 6 },
  { id: 'all', title: 'Смотреть все', icon: '🔍' },
];

const news = [
  { id: '1', title: 'Как ухаживать за растениями летом' },
  { id: '2', title: 'ТОП-5 удобрений для комнатных цветов' },
  { id: '3', title: 'Как выбрать идеальное растение для офиса' },
];

export default function ExploreScreen() {
  const router = useRouter();
  const [search, setSearch] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🔍 Поиск</Text>
      <TextInput
        placeholder="Найти растение..."
        style={styles.input}
        value={search}
        onChangeText={setSearch}
      />

      <Text style={styles.title}>🌿 Категории</Text>
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

      <Text style={styles.title}>📰 Новости</Text>
      {news.map((item) => (
        <View key={item.id} style={styles.newsCard}>
          <Text style={styles.newsText}>• {item.title}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f7fdf8' },
  title: { fontSize: 22, fontWeight: 'bold', marginTop: 20, marginBottom: 10 },
  input: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 10,
    fontSize: 16,
    elevation: 2,
  },
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
  newsCard: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 1,
  },
  newsText: { fontSize: 16 },
});
