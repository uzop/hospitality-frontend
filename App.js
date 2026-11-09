// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from './store';

import HotelSelectScreen from './screens/HotelSelectScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import RoomListScreen from './screens/RoomListScreen';
import RoomDetailScreen from './screens/RoomDetailScreen';
import MenuScreen from './screens/MenuScreen';
import RequestsScreen from './screens/RequestsScreen';
import RequestFormScreen from './screens/RequestFormScreen';
import ReservationScreen from './screens/ReservationScreen';
import PaymentScreen from './screens/PaymentScreen';
import PaymentSuccessScreen from './screens/PaymentSuccessScreen';   // ← Added
import MenuItemDetailScreen from './screens/MenuItemDetailScreen';
import ProfileScreen from './screens/ProfileScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="HotelSelect">
            <Stack.Screen 
              name="HotelSelect" 
              component={HotelSelectScreen} 
              options={{ title: 'Select Hotel' }} 
            />
            <Stack.Screen 
              name="Login" 
              component={LoginScreen} 
              options={{ title: 'Sign In' }} 
            />
            <Stack.Screen 
              name="Register" 
              component={RegisterScreen} 
              options={{ title: 'Create Account' }} 
            />
            <Stack.Screen 
              name="RoomList" 
              component={RoomListScreen} 
              options={{ title: 'Available Rooms' }} 
            />
            <Stack.Screen 
              name="RoomDetail" 
              component={RoomDetailScreen} 
              options={{ title: 'Room Details' }} 
            />
            <Stack.Screen 
              name="Menu" 
              component={MenuScreen} 
              options={{ title: 'Menu & Services' }} 
            />
            <Stack.Screen 
              name="Requests" 
              component={RequestsScreen} 
              options={{ title: 'My Requests' }} 
            />
            <Stack.Screen 
              name="NewRequest" 
              component={RequestFormScreen} 
              options={{ title: 'New Request' }} 
            />
            <Stack.Screen 
              name="Reservations" 
              component={ReservationScreen} 
              options={{ title: 'My Bookings' }} 
            />
            <Stack.Screen 
              name="Payment" 
              component={PaymentScreen} 
              options={{ title: 'Payment' }} 
            />
            <Stack.Screen 
              name="PaymentSuccess" 
              component={PaymentSuccessScreen} 
              options={{ title: 'Payment Successful', headerLeft: null }} 
            />
            <Stack.Screen
              name="MenuItemDetail"
              component={MenuItemDetailScreen}
              options={{ title: 'Item Details' }}
            />
            <Stack.Screen
              name="Profile"
              component={ProfileScreen}
              options={{ title: 'My Profile' }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}