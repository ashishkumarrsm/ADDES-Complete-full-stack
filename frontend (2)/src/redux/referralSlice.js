// usersSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
export const getReferralTree = createAsyncThunk(
  "staff/getReferralTree",
  async (referral_code, thunkAPI) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/v1/referral/list/${referral_code}`
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);
export const getTreeData = createAsyncThunk(
  "staff/getTreeData",
  async (referral_code, thunkAPI) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/v1/referral/full/${referral_code}`
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);
export const getDirectReferrals = createAsyncThunk(
  "referral/getDirectReferrals",
  async (
    { user_id, page = 1, limit = 10, search = "", status = "" },
    thunkAPI
  ) => {
    try {
      const params = new URLSearchParams({ page, limit, search, status });
      const response = await fetch(
        `http://localhost:8000/api/v1/referral/user/${user_id}/directs?${params.toString()}`
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

const initialState = {
  referralTree: null,
  treeData: null,
  directReferrals: [],
  totalReferrals: 0,
  loading: false,
  error: null,
  message: null,
};

const referralSlice = createSlice({
  name: "allreferral",
  initialState,
  reducers: {
    clearErrors: (state) => {
      state.error = null;
    },
    clearMessage: (state) => {
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getReferralTree.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getReferralTree.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.referralTree = action.payload.referralTree;
      })
      .addCase(getReferralTree.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      })
      .addCase(getTreeData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTreeData.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.treeData = action.payload.treeData;
      })
      .addCase(getTreeData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      })
      .addCase(getDirectReferrals.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getDirectReferrals.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.directReferrals = action.payload.referrals;
        state.totalReferrals = action.payload.total;
      })
      .addCase(getDirectReferrals.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      });
  },
});

export const { clearErrors, clearMessage } = referralSlice.actions;

export default referralSlice.reducer;
