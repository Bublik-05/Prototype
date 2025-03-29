import { View, Text, StyleSheet, ScrollView } from 'react-native';
import dayjs from 'dayjs';

const plants = [
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
  {
    id: '3',
    name: 'Алоэ',
    lastWatered: '2025-03-26',
    wateringInterval: 5,
  },
];

export default function CareLogScreen() {
  const today = dayjs();

  // Список всех поливов с датами
  const getSchedule = () => {
    return plants
      .map((plant) => {
        const nextDate = dayjs(plant.lastWatered).add(plant.wateringInterval, 'day');
        const diff = nextDate.diff(today, 'day');
        let status = '⏳ Ожидается';

        if (diff === 0) status = '🌊 Сегодня';
        else if (diff < 0) status = '❗ Просрочено';
        else if (diff > 0 && diff <= 1) status = '⚠️ Скоро';

        return {
          id: plant.id,
          name: plant.name,
          date: nextDate.format('DD.MM.YYYY'),
          status,
          daysLeft: diff,
        };
      })
      .sort((a, b) => dayjs(a.date, 'DD.MM.YYYY').diff(dayjs(b.date, 'DD.MM.YYYY')));
  };

  // To-Do лист на сегодня
  const getTodayTasks = () => {
    return getSchedule().filter((task) => task.daysLeft === 0);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>📘 Дневник ухода</Text>

      <Text style={styles.sectionTitle}>✅ Сегодня</Text>
      {getTodayTasks().length > 0 ? (
        getTodayTasks().map((task) => (
          <Text key={task.id} style={styles.todayTask}>
            • {task.name}
          </Text>
        ))
      ) : (
        <Text style={styles.none}>На сегодня нет поливов 👌</Text>
      )}

      <Text style={styles.sectionTitle}>🗓 Расписание</Text>
      <View style={styles.tableHeader}>
        <Text style={styles.cellName}>Растение</Text>
        <Text style={styles.cellDate}>Дата</Text>
        <Text style={styles.cellStatus}>Статус</Text>
      </View>

      {getSchedule().map((entry) => (
        <View key={entry.id} style={styles.tableRow}>
          <Text style={styles.cellName}>{entry.name}</Text>
          <Text style={styles.cellDate}>{entry.date}</Text>
          <Text style={styles.cellStatus}>{entry.status}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fdfefc' },
  title: { fontSize: 26, fontWeight: 'bold', marginBottom: 20 },
  sectionTitle: { fontSize: 20, fontWeight: '600', marginTop: 16, marginBottom: 10 },
  todayTask: { fontSize: 16, marginBottom: 6 },
  none: { fontSize: 16, color: 'gray' },

  tableHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingBottom: 4,
    marginBottom: 4,
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 6,
    borderBottomWidth: 0.5,
    borderColor: '#eee',
  },
  cellName: { flex: 2, fontSize: 15 },
  cellDate: { flex: 2, fontSize: 15 },
  cellStatus: { flex: 2, fontSize: 15 },
});
