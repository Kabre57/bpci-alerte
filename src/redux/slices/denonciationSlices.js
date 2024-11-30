import { createSlice } from '@reduxjs/toolkit'

export const denonciationsSlice = createSlice({
    name: 'denonciations',
    initialState: {
        value: {},
        loading: true
    },
    reducers: {
        add_denonciations: (state, action) => {
            state.value = { ...action.payload }
            state.loading = false
        },
        del_denonciations: (state, action) => {
            state.value = {}
        },
        toggle_denonciationLoading: (state, action) => {
            state.loading = action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const { add_denonciations, del_denonciations, toggle_denonciationLoading } = denonciationsSlice.actions

export const denonciationAsyncThunc = (denonciationData) => (dispatch) => {
    dispatch(add_denonciations(denonciationData))
}


export const toggle_denonciationLoadingAsyncThunc = (loadingState) => (dispatch) => {
    dispatch(toggle_denonciationLoading(loadingState))
}

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectDenonciation = (state) => state.denonciations.value


export default denonciationsSlice.reducer