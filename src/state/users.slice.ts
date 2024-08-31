import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IUser } from "../dto/user.interface";
import { RootState } from "./store"
import { filterUsers } from "../helpers";
import { UserService } from "../users.service";

export interface IUserSlice {
    users: IUser[];
    visibleUsers: IUser[]; 
    loading: boolean;
    error: string | null;
}

const initialState: IUserSlice = {
    users: [],
    visibleUsers: [],
    loading: false,
    error: null,
};

export const fetchUsers = createAsyncThunk<IUser[], void>(
    'users/fetchUsers',
    async () => {
        const usersList = await UserService.getAllUsers();
        return usersList;
    });


export const filterVisibleUsers = createAsyncThunk<IUser[], { searchTerm: string, prop: string }>(
    'users/filterUsers',
    async ({searchTerm, prop}, { getState }) => {
        const allUsers = (getState() as RootState).users.users;
        const filteredUsers = filterUsers(allUsers, searchTerm, prop);
        return filteredUsers;
    });

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setUsers: (state, action) => {
            console.log(action, state);
            state.users = action.payload;
            state.visibleUsers = action.payload;
        },
        setFilteredResults: (state, action) => {
            state.visibleUsers = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
    },
    selectors: {
        selectUsers: (state) => state.users,
        selectVisibleUsers: (state) => state.visibleUsers,
        selectLoading: (state) => state.loading,
        selectError: (state) => state.error,
    },
    extraReducers(builder) {
        builder.addCase(fetchUsers.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            state.loading = false;
            state.users = action.payload;
            state.visibleUsers = action.payload;
        });
        builder.addCase(fetchUsers.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Something went wrong';
        });
        builder.addCase(filterVisibleUsers.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(filterVisibleUsers.fulfilled, (state, action) => {
            state.loading = false;
            state.visibleUsers = action.payload;
        });
        builder.addCase(filterVisibleUsers.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Something went wrong';
        });
    },
});

export const { setUsers, setLoading, setError, setFilteredResults } = usersSlice.actions;

export const { selectUsers, selectVisibleUsers, selectLoading, selectError } = usersSlice.selectors;

export default usersSlice.reducer;
