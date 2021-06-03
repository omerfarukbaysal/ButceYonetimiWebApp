
const initialState = {
    hesap: [],
    loading: true
}

export default function hesapReducer(state = initialState, action) {
    switch (action.type) {
        case "GET_HESAP":
            return { ...state, hesap: action.payload, loading: false }
        case "SET_HESAP":
            return { ...state, ...action.payload, loading: false }
        case "DELETE_HESAP":
            return { ...state, ...action.payload, loading: false }
        default:
            return state
    }
}