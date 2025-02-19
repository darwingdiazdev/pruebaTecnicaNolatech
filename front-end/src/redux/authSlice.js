import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { registerUser } from "../services/user.service";
import { loginUser } from "../services/auth.service";

// Acción asincrónica para registrar usuario
export const register = createAsyncThunk("auth/register", async (userData, { rejectWithValue }) => {
  try {
    const response = await registerUser(userData);
    return response;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

// Acción asincrónica para iniciar sesión
export const login = createAsyncThunk("auth/login", async (credentials, { rejectWithValue }) => {
  try {
    const response = await loginUser(credentials);
    return response;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: localStorage.getItem("userToken") || null,
    role: localStorage.getItem("userRole") || null,
    isLoading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.role = null;
      localStorage.removeItem("userToken");
      localStorage.removeItem("userRole");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.token = action.payload.token;
        state.role = action.payload.role; // Guardamos el rol

        localStorage.setItem("userToken", action.payload.token);
        localStorage.setItem("userRole", action.payload.role); // Guardamos en localStorage
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
