import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface UploadState {
  loading: boolean;
  error: string | null;
  message: string | null;
}

const initialState: UploadState = {
  loading: false,
  error: null,
  message: null,
};

export const uploadCSVFile = createAsyncThunk(
  "file/uploadCSVFile",
  async (
    {
      file,
      group_id,
      user_id,
    }: { file: File; group_id: string | number; user_id: string | number },
    thunkAPI
  ) => {
    try {
      const formData = new FormData();
      formData.append("group_id", group_id.toString());
      formData.append("user_id", user_id.toString());
      formData.append("excelfile", file);

      const response = await axios.post(
        "http://1msg.1point1.in:3001/api/auth/j-v1/contacts/upload/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return response.data.message;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Upload failed"
      );
    }
  }
);

const uploadCSVFileSlice = createSlice({
  name: "uploadFile",
  initialState,
  reducers: {
    resetUploadState: (state) => {
      state.loading = false;
      state.error = null;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadCSVFile.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(uploadCSVFile.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload;
      })
      .addCase(uploadCSVFile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetUploadState } = uploadCSVFileSlice.actions;

export default uploadCSVFileSlice.reducer;
