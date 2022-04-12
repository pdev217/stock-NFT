import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  imageUrl: "/",
  username: "Profile",
  banner: "",
};

export const userData = createSlice({
  name: "userData",
  initialState,
  reducers: {
    setImage: (state, action) => {
      if (action.payload === null) {
        state.imageUrl = `/create-nft/empty-profileImage.png`;
      } else {
        state.imageUrl = `${process.env.BACKEND_WITHOUT_API}/assets/profileImages/${action.payload}`;
      }
    },
    setBanner: (state, action) => {
      if (action.payload === null) {
        state.banner = `/create-nft/empty-profileBanner.png`;
      } else {
        state.banner = `${process.env.BACKEND_WITHOUT_API}/assets/profileBanner/${action.payload}`;
      }
    },
    setUsername: (state, action) => {
      if (action.payload === "") {
        state.username = "Profile";
      } else {
        state.username = action.payload;
      }
    },
  },
});

export const { setImage, setUsername, setBanner } = userData.actions;

export default userData.reducer;
