import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useState } from 'react';

const allNotifications = [
  { id: '1', type: 'watering', message: '💧 Полей фикус – осталось 1 день' },
  { id: '2', type: 'new', message: '🆕 Появилось новое растение: Монстера' },
  { id: '3', type: 'news', message: '📰 Советы по уходу за Алоказией (у вас есть такая)' },
  { id: '4', type: 'analysis', message: '📊 Ваша статистика за неделю: 3 растения политы вовремя' },
  { id: '5', type: 'watering', message: '💧 Кактус нужно полить через 2 дня' },
];

const filters = [
  { label: 'Все', value: 'all' },
  { label: 'Полив', value: 'watering' },
  { label: 'Новинки', value: 'new' },
  { label: 'Новости', value: 'news' },
  { label: 'Анализ', value: 'analysis' },
];

export default function NotificationsScreen() {
  const [selectedFilter, setSelectedFilter] = useState('all');

  const filteredNotifications = selectedFilter === 'all'
    ? allNotifications
    : allNotifications.filter((n) => n.type === selectedFilter);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🔔 Уведомления</Text>

      <View style={styles.filterRow}>
        {filters.map((filter) => (
          <TouchableOpacity
            key={filter.value}
            style={[
              styles.filterBtn,
              selectedFilter === filter.value && styles.filterBtnActive,
            ]}
            onPress={() => setSelectedFilter(filter.value)}
          >
            <Text
              style={[
                styles.filterText,
                selectedFilter === filter.value && styles.filterTextActive,
              ]}
            >
              {filter.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={filteredNotifications}
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

  filterRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
    gap: 8,
  },
  filterBtn: {
    backgroundColor: '#e0e0e0',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  filterBtnActive: {
    backgroundColor: '#4CAF50',
  },
  filterText: {
    color: '#444',
    fontWeight: '500',
  },
  filterTextActive: {
    color: '#fff',
  },
});
