import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface UploadState {
  loading: boolean;
  error: string | null;
  url: string | null;
}

const initialState: UploadState = {
  loading: false,
  error: null,
  url: null,
};

// Async thunk for file upload
// export const uploadFile = createAsyncThunk(
//   "file/uploadFile",
//   async (file: File, thunkAPI) => {
//     try {
//       const formData = new FormData();
//       formData.append("file", file);

//       const response = await axios.post(
//         "http://1msg.1point1.in:3001/api/auth/j-v1/upload-file/",
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );

//       return response.data.url;
//     } catch (error: any) {
//       return thunkAPI.rejectWithValue(
//         error.response?.data?.message || "Upload failed"
//       );
//     }
//   }
// );


export const uploadFile = createAsyncThunk(
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

const uploadFileSlice = createSlice({
  name: "uploadFile",
  initialState,
  reducers: {
    resetUploadState: (state) => {
      state.loading = false;
      state.error = null;
      state.url = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadFile.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.url = null;
      })
      .addCase(uploadFile.fulfilled, (state, action) => {
        state.loading = false;
        state.url = action.payload;
      })
      .addCase(uploadFile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetUploadState } = uploadFileSlice.actions;

export default uploadFileSlice.reducer;
