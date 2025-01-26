import { createSlice } from '@reduxjs/toolkit';

// Helper functions for LocalStorage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem('cart');
    return serializedState ? JSON.parse(serializedState) : [];
  } catch (error) {
    console.error('Error loading state:', error);
    return [];
  }
};

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('cart', serializedState);
  } catch (error) {
    console.error('Error saving state:', error);
  }
};

const initialState = loadState(); // Load persisted state

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearCart: (state) => {
      saveState([]);
      return [];
    },
    pushItem: (state, action) => {
      state.push(action.payload);
      saveState(state);
    },
    removeItem: (state, action) => {
      const updatedState = state.filter((item) => item.id !== action.payload);
      saveState(updatedState);
      return updatedState;
    },
    addItem: (state, action) => {
      state.forEach((item) => {
        if (item.id === action.payload) {
          item.quantity += 1;
          item.totalprice = item.price * item.quantity;
        }
      });
      saveState(state);
    },
    subtractItem: (state, action) => {
      state.forEach((item) => {
        if (item.id === action.payload) {
          if (item.quantity > 1) {
            item.quantity -= 1;
            item.totalprice = item.price * item.quantity;
          } else {
            const index = state.findIndex((i) => i.id === item.id);
            state.splice(index, 1);
          }
        }
      });
      saveState(state);
    },
  },
});

export const { clearCart, pushItem, removeItem, addItem, subtractItem } = cartSlice.actions;

export default cartSlice.reducer;
