import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Alert,
} from 'react-native';
import { colors, spacing, globalStyles } from './styles/globalStyles';

export default function Index() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (username.trim() === '' || password.trim() === '') {
      Alert.alert('Error', 'Please enter both username and password');
      return;
    }
    
    Alert.alert('Login Attempt', `Username: ${username}\nPassword: ${password}`);
    console.log('Login attempt:', { username, password });
  };

  return (
    <SafeAreaView style={globalStyles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      <View style={globalStyles.content}>
        {/* Header */}
        <View style={globalStyles.header}>
          <Text style={globalStyles.title}>Welcome Back</Text>
          <Text style={globalStyles.subtitle}>Sign in to continue</Text>
        </View>

        {/* Login Form */}
        <View style={globalStyles.form}>
          <View style={globalStyles.inputContainer}>
            <Text style={globalStyles.label}>Username</Text>
            <TextInput
              style={globalStyles.input}
              value={username}
              onChangeText={setUsername}
              placeholder="Enter your username"
              placeholderTextColor={colors.placeholder}
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          <View style={globalStyles.inputContainer}>
            <Text style={globalStyles.label}>Password</Text>
            <TextInput
              style={globalStyles.input}
              value={password}
              onChangeText={setPassword}
              placeholder="Enter your password"
              placeholderTextColor={colors.placeholder}
              secureTextEntry={true}
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          <TouchableOpacity style={globalStyles.loginButton} onPress={handleLogin}>
            <Text style={globalStyles.loginButtonText}>Sign In</Text>
          </TouchableOpacity>

          <TouchableOpacity style={globalStyles.forgotPassword}>
            <Text style={globalStyles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}