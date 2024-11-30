import { createSlice } from '@reduxjs/toolkit'

export const servicesSlice = createSlice({
    name: 'services',
    initialState: {
        value: {},
        loading: true
    },
    reducers: {
        add_services: (state, action) => {
            state.value = { ...action.payload }
            state.loading = false
        },
        del_services: (state, action) => {
            state.value = {}
        },
        toggle_servicesLoading: (state, action) => {
            state.loading = action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const { add_services, del_services, toggle_servicesLoading } = servicesSlice.actions

export const servicesAsyncThunc = (servicesData) => (dispatch) => {
    dispatch(add_services(servicesData))
}


export const toggle_servicesLoadingAsyncThunc = (loadingState) => (dispatch) => {
    dispatch(toggle_servicesLoading(loadingState))
}

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectServices = (state) => state.services.value


export default servicesSlice.reducer