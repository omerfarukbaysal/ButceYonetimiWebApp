const initialState = {
    kategori: [],
    loading: true
}

export default function kategoriReducer(state = initialState, action) {
    switch (action.type) {
        case "GET_KATEGORI":
            return { ...state, kategori: action.payload, loading: false }
        case "SET_KATEGORI":
            return { ...state, ...action.payload, loading: false }
        default:
            return state
    }
}