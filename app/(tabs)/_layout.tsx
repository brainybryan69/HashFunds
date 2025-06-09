import { Tabs, useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext'; // ← Fixed path
import { ActivityIndicator, View } from 'react-native';

export default function TabLayout() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/(auth)/Login');
    }
  }, [loading, user, router]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen 
        name="index" 
        options={{
          title: 'Home',
        }}
      />
      <Tabs.Screen 
        name="profile" 
        options={{
          title: 'Profile',
        }}
      />
    </Tabs>
  );
}