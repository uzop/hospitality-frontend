// slices/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Login Thunk - Hotel Specific
export const login = createAsyncThunk(
  'auth/login',
  async ({ username, password, hotelId }, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://10.0.2.2:8080/auth/login', {
        username,
        password,
        hotelId,                    // ← Important: Send hotelId during login
      });
      return response.data; // Expected: { jwt: "..." }
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 
        error.response?.data || 
        'Login failed. Please check your credentials for this hotel.'
      );
    }
  }
);

// // Register Thunk
// export const register = createAsyncThunk(
//   'auth/register',
//   async (userData, { rejectWithValue }) => {
//     try {
//       const formData = new FormData();
      
//       formData.append('username', userData.username);
//       formData.append('email', userData.email);
//       formData.append('password', userData.password);
//       formData.append('fullName', userData.fullName);
//       formData.append('hotelId', userData.hotelId);

//       if (userData.idImageUri) {
//         formData.append('idImage', {
//           uri: userData.idImageUri,
//           name: `id_${Date.now()}.jpg`,
//           type: 'image/jpeg',
//         });
//       }

//       const response = await axios.post(
//         'http://10.0.2.2:8080/auth/register',
//         formData,
//         {
//           headers: { 'Content-Type': 'multipart/form-data' },
//         }
//       );

//       return response.data;
//     } catch (error) {
//       console.error("Registration error details:", error.response?.data); // ← Better logging
//       return rejectWithValue(
//         error.response?.data?.message || 
//         error.response?.data || 
//         'Registration failed. Please try again.'
//       );
//     }
//   }
// );


// register Thunk
export const register = createAsyncThunk(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      
      formData.append('username', userData.username);
      formData.append('email', userData.email);
      formData.append('password', userData.password);
      formData.append('fullName', userData.fullName);
      formData.append('hotelId', userData.hotelId.toString());   // ← Important: convert to string

      if (userData.idImageUri) {
        formData.append('idImage', {
          uri: userData.idImageUri,
          name: `id_${Date.now()}.jpg`,
          type: 'image/jpeg',
        });
      }

      const response = await axios.post(
        'http://10.0.2.2:8080/auth/register',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',   // Let Axios handle boundary
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error("Full Registration Error:", {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message
      });
      
      return rejectWithValue(
        error.response?.data || 
        error.message || 
        'Registration failed'
      );
    }
  }
);

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  registrationSuccess: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
      state.registrationSuccess = false;
    },
    clearError: (state) => {
      state.error = null;
    },
    resetRegistrationSuccess: (state) => {
      state.registrationSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.jwt;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Register
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state) => {
        state.loading = false;
        state.registrationSuccess = true;
        state.error = null;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, clearError, resetRegistrationSuccess } = authSlice.actions;
export default authSlice.reducer;