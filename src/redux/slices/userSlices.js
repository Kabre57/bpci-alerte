import { createSlice } from '@reduxjs/toolkit'

export const userInfoSlice = createSlice({
    name: 'userInfo',
    initialState: {
        value: {},
    },
    reducers: {
        add_user: (state, action) => {
            state.value = action.payload
        },
        del_user: (state) => {
            state.value = {}
        },
    },
})

// Action creators are generated for each case reducer function
export const { add_user, del_user, } = userInfoSlice.actions

export const userAsyncThunc = (userData) => (dispatch) => {
    dispatch(add_user(userData))
}

export const userRemoveAsyncThunc = () => (dispatch) => {
    dispatch(del_user())
}

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectUserInfo = (state) => state.userInfo.value


export default userInfoSlice.reducer