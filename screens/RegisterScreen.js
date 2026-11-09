// screens/RegisterScreen.js
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator,
  Image,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Linking from 'expo-linking';
import { useDispatch, useSelector } from 'react-redux';
import { register, clearError, resetRegistrationSuccess } from '../slices/authSlice';

export default function RegisterScreen({ navigation, route }) {
  const selectedHotel = route.params?.hotel;

  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [idImage, setIdImage] = useState(null);

  const dispatch = useDispatch();
  const { loading, error, registrationSuccess } = useSelector((state) => state.auth);

  // Clean User-Friendly Error Handling
  useEffect(() => {
    if (error) {
      let userMessage = "Registration failed. Please try again.";

      if (typeof error === 'string') {
        if (error.toLowerCase().includes("username already taken")) {
          userMessage = "This username is already taken for this hotel. Please choose another username.";
        } else if (error.toLowerCase().includes("hotel not found")) {
          userMessage = "Selected hotel is no longer available. Please go back and select another hotel.";
        } else if (error.includes("403")) {
          userMessage = "Access denied. Please check your details and try again.";
        } else if (error.includes("failed")) {
          userMessage = error;
        }
      }

      Alert.alert('Registration Failed', userMessage);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  // Success Handling
  useEffect(() => {
    if (registrationSuccess) {
      Alert.alert('Success', 'Account created successfully!', [
        { 
          text: 'Continue to Book Room', 
          onPress: () => navigation.navigate('RoomList', { hotel: selectedHotel }) 
        },
      ]);
      dispatch(resetRegistrationSuccess());
    }
  }, [registrationSuccess, dispatch, navigation, selectedHotel]);

  // Pick from Gallery
  const pickFromGallery = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Required', 'We need access to your photos.', [
          { text: 'Cancel' },
          { text: 'Open Settings', onPress: () => Linking.openSettings() },
        ]);
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: 'images',
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled && result.assets?.length > 0) {
        setIdImage(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to open gallery.');
    }
  };

  // Take Photo with Camera
  const takePhotoWithCamera = async () => {
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Required', 'We need access to your camera.', [
          { text: 'Cancel' },
          { text: 'Open Settings', onPress: () => Linking.openSettings() },
        ]);
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: 'images',
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled && result.assets?.length > 0) {
        setIdImage(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to open camera.');
    }
  };

  const handleRegister = () => {
    if (!fullName || !username || !email || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters');
      return;
    }

    if (!selectedHotel) {
      Alert.alert('Error', 'No hotel selected. Please go back.');
      navigation.navigate('HotelSelect');
      return;
    }

    dispatch(register({
      fullName,
      username,
      email,
      password,
      hotelId: selectedHotel.id,
      idImageUri: idImage,
    }));
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>
          Registering at {selectedHotel?.name || 'Selected Hotel'}
        </Text>

        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Full Name (as it appears on ID)"
            value={fullName}
            onChangeText={setFullName}
          />

          <TextInput
            style={styles.input}
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
          />

          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />

          <Text style={styles.infoText}>
            Please upload a clear photo of your valid ID (NIN, Passport, Driver's License, etc.)
          </Text>

          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.optionButton} onPress={pickFromGallery}>
              <Text style={styles.optionButtonText}>📁 Choose from Gallery</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.optionButton} onPress={takePhotoWithCamera}>
              <Text style={styles.optionButtonText}>📸 Take Photo Now</Text>
            </TouchableOpacity>
          </View>

          {idImage && <Image source={{ uri: idImage }} style={styles.previewImage} />}

          <TouchableOpacity
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={handleRegister}
            disabled={loading}
          >
            {loading ? <ActivityIndicator color="white" /> : <Text style={styles.buttonText}>Register</Text>}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.linkContainer}
            onPress={() => navigation.navigate('Login', { hotel: selectedHotel })}
          >
            <Text style={styles.linkText}>
              Already have an account? <Text style={styles.linkHighlight}>Sign In</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  scrollContent: { flexGrow: 1, padding: 24, justifyContent: 'center' },
  title: { fontSize: 32, fontWeight: 'bold', textAlign: 'center', marginBottom: 8 },
  subtitle: { fontSize: 16, color: '#666', textAlign: 'center', marginBottom: 30 },
  form: { width: '100%' },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    fontSize: 16,
  },
  infoText: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
    marginBottom: 16,
    paddingHorizontal: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  optionButton: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  optionButtonText: { color: '#007AFF', fontWeight: '600' },
  previewImage: { width: '100%', height: 200, borderRadius: 12, marginBottom: 16, resizeMode: 'contain' },
  button: {
    backgroundColor: '#007AFF',
    borderRadius: 12,
    padding: 18,
    alignItems: 'center',
    marginTop: 12,
  },
  buttonDisabled: { backgroundColor: '#99ccff' },
  buttonText: { color: 'white', fontSize: 18, fontWeight: '600' },
  linkContainer: { alignItems: 'center', marginTop: 20 },
  linkText: { fontSize: 16, color: '#666' },
  linkHighlight: { color: '#007AFF', fontWeight: '600' },
});