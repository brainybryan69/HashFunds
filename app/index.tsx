import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Alert,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { User } from 'firebase/auth'; // Import Firebase User type
import { colors, globalStyles } from './styles/globalStyles';
import { authService } from '../config/firebase';

export default function Index() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null); // Fix: Add proper type

  // Listen for authentication state changes
  useEffect(() => {
    const unsubscribe = authService.onAuthStateChanged((user: User | null) => { // Fix: Add type annotation
      setUser(user);
      if (user) {
        console.log('User is signed in:', user.email);
      } else {
        console.log('User is signed out');
      }
    });

    return unsubscribe;
  }, []);

  const validateInputs = () => {
    if (!email.trim()) {
      Alert.alert('Error', 'Please enter your email');
      return false;
    }
    
    if (!email.includes('@') || !email.includes('.')) {
      Alert.alert('Error', 'Please enter a valid email address');
      return false;
    }

    if (!password.trim()) {
      Alert.alert('Error', 'Please enter your password');
      return false;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters');
      return false;
    }

    // Additional validation for sign up
    if (!isLogin) {
      if (!username.trim()) {
        Alert.alert('Error', 'Please enter a username');
        return false;
      }

      if (username.length < 3) {
        Alert.alert('Error', 'Username must be at least 3 characters');
        return false;
      }

      if (!firstName.trim()) {
        Alert.alert('Error', 'Please enter your first name');
        return false;
      }

      if (!lastName.trim()) {
        Alert.alert('Error', 'Please enter your last name');
        return false;
      }

      if (password !== confirmPassword) {
        Alert.alert('Error', 'Passwords do not match');
        return false;
      }
    }

    return true;
  };

  const handleLogin = async () => {
    if (!validateInputs()) return;

    setLoading(true);
    
    try {
      const result = await authService.signIn(email, password);
      
      if (result.success) {
        Alert.alert('Success', `Welcome back!`);
        clearForm();
      } else {
        // More specific error messages
        let errorMessage = result.error;
        if (result.error.includes('user-not-found')) {
          errorMessage = 'No account found with this email. Please sign up first.';
        } else if (result.error.includes('wrong-password')) {
          errorMessage = 'Incorrect password. Please try again.';
        } else if (result.error.includes('invalid-email')) {
          errorMessage = 'Please enter a valid email address.';
        }
        Alert.alert('Login Failed', errorMessage);
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong. Please try again.');
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async () => {
    if (!validateInputs()) return;

    setLoading(true);
    
    try {
      const userData = {
        username: username.toLowerCase(),
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        displayName: `${firstName} ${lastName}`,
        fullName: `${firstName} ${lastName}`,
      };
      
      const result = await authService.signUp(email, password, userData);
      
      if (result.success) {
        Alert.alert(
          'Welcome!', 
          `Account created successfully! Welcome, ${firstName}!`,
          [
            {
              text: 'OK',
              onPress: () => {
                clearForm();
                setIsLogin(true); // Switch back to login view
              }
            }
          ]
        );
      } else {
        // More specific error messages
        let errorMessage = result.error;
        if (result.error.includes('email-already-in-use')) {
          errorMessage = 'An account with this email already exists. Please sign in instead.';
        } else if (result.error.includes('weak-password')) {
          errorMessage = 'Password is too weak. Please choose a stronger password.';
        } else if (result.error.includes('invalid-email')) {
          errorMessage = 'Please enter a valid email address.';
        }
        Alert.alert('Sign Up Failed', errorMessage);
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong. Please try again.');
      console.error('Sign up error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = () => {
    if (isLogin) {
      handleLogin();
    } else {
      handleSignUp();
    }
  };

  const clearForm = () => {
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setUsername('');
    setFirstName('');
    setLastName('');
  };

  const switchMode = () => {
    setIsLogin(!isLogin);
    clearForm();
  };

  const handleSignOut = async () => {
    const result = await authService.signOut();
    if (result.success) {
      Alert.alert('Success', 'You have been signed out.');
    }
  };

  // If user is logged in, show dashboard
  if (user) {
    return (
      <SafeAreaView style={globalStyles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
        
        <View style={globalStyles.content}>
          <View style={globalStyles.header}>
            <Text style={globalStyles.title}>Welcome!</Text>
            <Text style={globalStyles.subtitle}>
              You are logged in as: {user.email || 'Unknown'} {/* Fix: Add null check */}
            </Text>
          </View>

          <TouchableOpacity style={globalStyles.loginButton} onPress={handleSignOut}>
            <Text style={globalStyles.loginButtonText}>Sign Out</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={globalStyles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={globalStyles.content}>
          {/* Header */}
          <View style={globalStyles.header}>
            <Text style={globalStyles.title}>
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </Text>
            <Text style={globalStyles.subtitle}>
              {isLogin ? 'Sign in to continue' : 'Join us today!'}
            </Text>
          </View>

          {/* Form */}
          <View style={globalStyles.form}>
            {/* Sign Up Only Fields */}
            {!isLogin && (
              <>
                <View style={globalStyles.inputContainer}>
                  <Text style={globalStyles.label}>First Name</Text>
                  <TextInput
                    style={globalStyles.input}
                    value={firstName}
                    onChangeText={setFirstName}
                    placeholder="Enter your first name"
                    placeholderTextColor={colors.placeholder}
                    autoCapitalize="words"
                    autoCorrect={false}
                  />
                </View>

                <View style={globalStyles.inputContainer}>
                  <Text style={globalStyles.label}>Last Name</Text>
                  <TextInput
                    style={globalStyles.input}
                    value={lastName}
                    onChangeText={setLastName}
                    placeholder="Enter your last name"
                    placeholderTextColor={colors.placeholder}
                    autoCapitalize="words"
                    autoCorrect={false}
                  />
                </View>

                <View style={globalStyles.inputContainer}>
                  <Text style={globalStyles.label}>Username</Text>
                  <TextInput
                    style={globalStyles.input}
                    value={username}
                    onChangeText={setUsername}
                    placeholder="Choose a username"
                    placeholderTextColor={colors.placeholder}
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                </View>
              </>
            )}

            {/* Email field */}
            <View style={globalStyles.inputContainer}>
              <Text style={globalStyles.label}>Email</Text>
              <TextInput
                style={globalStyles.input}
                value={email}
                onChangeText={setEmail}
                placeholder="Enter your email"
                placeholderTextColor={colors.placeholder}
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
              />
            </View>

            {/* Password field */}
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

            {/* Confirm Password (Sign Up Only) */}
            {!isLogin && (
              <View style={globalStyles.inputContainer}>
                <Text style={globalStyles.label}>Confirm Password</Text>
                <TextInput
                  style={globalStyles.input}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  placeholder="Confirm your password"
                  placeholderTextColor={colors.placeholder}
                  secureTextEntry={true}
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>
            )}

            {/* Submit Button */}
            <TouchableOpacity 
              style={[globalStyles.loginButton, loading && { opacity: 0.7 }]} 
              onPress={handleSubmit}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#ffffff" />
              ) : (
                <Text style={globalStyles.loginButtonText}>
                  {isLogin ? 'Sign In' : 'Create Account'}
                </Text>
              )}
            </TouchableOpacity>

            {/* Toggle between Login/Signup */}
            <TouchableOpacity 
              style={[globalStyles.forgotPassword, { marginTop: 20 }]}
              onPress={switchMode}
            >
              <Text style={globalStyles.forgotPasswordText}>
                {isLogin 
                  ? "Don't have an account? Sign Up" 
                  : "Already have an account? Sign In"
                }
              </Text>
            </TouchableOpacity>

            {/* Forgot Password (only show in login mode) */}
            {isLogin && (
              <TouchableOpacity style={globalStyles.forgotPassword}>
                <Text style={globalStyles.forgotPasswordText}>Forgot Password?</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}