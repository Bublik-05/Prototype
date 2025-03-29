import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function Layout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName: any;

          if (route.name === 'index') {
            iconName = 'home-outline';
          } else if (route.name === 'explore') {
            iconName = 'book-outline';
          } else if (route.name === 'notifications') {
            iconName = 'notifications-outline';
          }else if (route.name === 'settings') {
            iconName = 'settings-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}
    />
  );
}
