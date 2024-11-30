import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slices/userSlices'
import denonciationsReducer from './slices/denonciationSlices'
import modalsSlice from './slices/modalsSlice'
import servicesReducer from './slices/servicesSlices'
export default configureStore({
    reducer: {
        userInfo: userReducer,
        denonciations: denonciationsReducer,
        modalsRed: modalsSlice,
        services: servicesReducer,
    },
})