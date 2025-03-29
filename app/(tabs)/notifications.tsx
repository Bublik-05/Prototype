import { View, Text, FlatList, StyleSheet } from 'react-native';

const notifications = [
  { id: '1', message: '🌿 Полей фикус – осталось 1 день' },
  { id: '2', message: '💧 Кактус нужно полить через 2 дня' },
  { id: '3', message: '🪴 Новое растение добавлено в каталог' },
];

export default function NotificationsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🔔 Уведомления</Text>

      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.message}>{item.message}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f9fff9' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  card: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 10,
    marginBottom: 12,
    elevation: 2,
  },
  message: { fontSize: 16 },
});
