import { createSlice } from "@reduxjs/toolkit";
import { setSearchCompanyByText } from "./companySlice";

const jobSlice = createSlice({
  name: "job",
  initialState: {
    allJobs: [],
    allAdminJobs: [],
    singlejob: null,
    searchJobByText: "",
  },
  reducers: {
    setAllJobs: (state, action) => {
      state.allJobs = action.payload;
    },
    setSinglejob: (state, action) => {
      state.singlejob = action.payload;
    },
    setAllAdminJobs: (state, action) => {
      state.allAdminJobs = action.payload;
    },
    setSearchJobByText: (state, action) => {
      state.searchJobByText = action.payload;
    },
  },
});

export const { setAllJobs, setSinglejob, setAllAdminJobs, setSearchJobByText } =
  jobSlice.actions;
export default jobSlice.reducer;
