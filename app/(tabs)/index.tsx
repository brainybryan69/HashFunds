import { Text, View, StyleSheet } from "react-native";
import { useAuth } from '../contexts/AuthContext';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';

export default function Index() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/Login');
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>
        Welcome back, {user?.firstName}!
      </Text>
      <Text style={styles.subtitle}>
        HEADER
      </Text>
      
      <View style={styles.content}>
        <Text style={styles.contentText}>
          balance card goes here
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 20,
    backgroundColor: '#fff',
    paddingTop: 50,
  },
  welcome: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
    textAlign: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#333',
  },
});