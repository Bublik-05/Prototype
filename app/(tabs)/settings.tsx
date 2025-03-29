import { View, Text, StyleSheet, Switch, TouchableOpacity } from 'react-native';
import { useState } from 'react';

export default function SettingsScreen() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [language, setLanguage] = useState('ru');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>⚙️ Настройки</Text>

      {/* Тема */}
      <View style={styles.settingRow}>
        <Text style={styles.label}>Тёмная тема</Text>
        <Switch
          value={isDarkMode}
          onValueChange={(value) => setIsDarkMode(value)}
        />
      </View>

      {/* Язык */}
      <View style={styles.settingRow}>
        <Text style={styles.label}>Язык интерфейса</Text>
        <TouchableOpacity
          style={styles.languageBtn}
          onPress={() => setLanguage(language === 'ru' ? 'en' : 'ru')}
        >
          <Text style={styles.languageText}>
            {language === 'ru' ? 'Русский' : 'English'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Уведомления */}
      <View style={styles.settingRow}>
        <Text style={styles.label}>Уведомления</Text>
        <Switch
          value={notificationsEnabled}
          onValueChange={(value) => setNotificationsEnabled(value)}
        />
      </View>

      {/* Выход */}
      <TouchableOpacity style={styles.logoutBtn}>
        <Text style={styles.logoutText}>🚪 Выйти</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f3fdf3' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 24 },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingVertical: 8,
    borderBottomWidth: 0.5,
    borderColor: '#ccc',
  },
  label: { fontSize: 16 },
  languageBtn: {
    backgroundColor: '#e0f0e0',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  languageText: { fontWeight: '500' },
  logoutBtn: {
    marginTop: 40,
    backgroundColor: '#e74c3c',
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  logoutText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});
