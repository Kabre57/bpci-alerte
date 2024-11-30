import { createSlice } from '@reduxjs/toolkit'

export const modalsSlice = createSlice({
    name: 'modalsRed',
    initialState: {
        showModalsImage: false,
        showModalsValidateActionWithMessage: false,
        showModalsConfirm: false,
        idForDelete: "",
        dataForValidationAction: { id: "", status: "" },
        imgUrl: "",
        showModalsPDF: false,
        pDFUrl: "",
    },
    reducers: {
        toggleModalsImage: (state, action) => {
            state.showModalsImage = action.payload
            // state = { ...state, showModalsImage: action.payload }
        },
        toggleModalsValidateActionWithMessage: (state, action) => {
            state.showModalsValidateActionWithMessage = action.payload
            // state = { ...state, showModalsImage: action.payload }
        },
        toggleModalsConfirm: (state, action) => {
            state.showModalsConfirm = action.payload
            // state = { ...state, showModalsImage: action.payload }
        },
        toggleModalsPDF: (state, action) => {
            state.showModalsPDF = action.payload
            // state = { ...state, showModalsImage: action.payload }
        },
        setIdForDelete: (state, action) => {
            state.idForDelete = action.payload
        },

        setImageUrl: (state, action) => {
            state.imgUrl = action.payload
        },
        setpDFUrl: (state, action) => {
            state.pDFUrl = action.payload
        },
        setDataForValidationAction: (state, action) => {
            state.dataForValidationAction = action.payload
        }
    },
})

// Action creators are generated for each case reducer function
export const { toggleModalsImage, setImageUrl, toggleModalsPDF, toggleModalsValidateActionWithMessage, setDataForValidationAction,
    setpDFUrl, toggleModalsConfirm, setIdForDelete } = modalsSlice.actions

export const modalsImageAsyncThunc = (dataToggler) => (dispatch) => {
    dispatch(toggleModalsImage(dataToggler))
}

export const modalsValidateActionWithMessageAsyncThunc = (dataToggler) => (dispatch) => {
    dispatch(toggleModalsValidateActionWithMessage(dataToggler))
}

export const modalsConfirmAsyncThunc = (dataToggler) => (dispatch) => {
    dispatch(toggleModalsConfirm(dataToggler))
}

export const modalsPDFAsyncThunc = (dataToggler) => (dispatch) => {
    dispatch(toggleModalsPDF(dataToggler))
}

export const settingPDFURLAsyncThunc = (url) => (dispatch) => {
    dispatch(setpDFUrl(url))
}

export const settingImageURLAsyncThunc = (url) => (dispatch) => {
    dispatch(setImageUrl(url))
}

export const settingIdForDeleteAsyncThunc = (url) => (dispatch) => {
    dispatch(setIdForDelete(url))
}

export const settingdataForValidationAction = (url) => (dispatch) => {
    dispatch(setDataForValidationAction(url))
}

export default modalsSlice.reducer