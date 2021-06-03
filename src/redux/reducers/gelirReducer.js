const initialState = {
    gelir: [],
    loading: true
}

export default function gelirReducer(state = initialState, action) {
    switch (action.type) {
        case "GET_GELIR":
            return { ...state, gelir: action.payload, loading: false }
        case "SET_GELIR":
            return { ...state, ...action.payload, loading: false }
        case "DELETE_GELIR":
            return { ...state, ...action.payload, loading: false }
        default:
            return state
    }
}