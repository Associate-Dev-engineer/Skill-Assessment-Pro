import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type Role } from "@/types/components";

type Profile = {
  username: string;
  email: string;
};

interface UserState {
  profile: Profile;
  role: Role;
  status: "active" | "inactive";
}

const initialState: UserState = {
  profile: {
    username: "Arun Kumar",
    email: "dev.arunengineer@gmail.com",
  },
  role: "admin",
  status: "inactive",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUserDetails: (state, action: PayloadAction<Profile>) => {
      // Use camelCase
      state.profile = action.payload;
    },
    updateUserRole: (state, action: PayloadAction<Role>) => {
      state.role = action.payload;
    },
    setUserStatus: (state, action: PayloadAction<"active" | "inactive">) => {
      state.status = action.payload;
    },
    resetUser: (state) => {
      state.profile = initialState.profile;
      state.role = initialState.role;
      state.status = initialState.status;
    },
  },
});

export const { addUserDetails, updateUserRole, setUserStatus, resetUser } =
  userSlice.actions;

export default userSlice.reducer;
