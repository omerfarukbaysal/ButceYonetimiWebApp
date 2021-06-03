const initialState = {
    gider: [],
    loading: true
}

export default function giderReducer(state = initialState, action) {
    switch (action.type) {
        case "GET_GIDER":
            return { ...state, gider: action.payload, loading: false }
        case "SET_GIDER":
            return { ...state, ...action.payload, loading: false }
        case "DELETE_GIDER":
            return { ...state, ...action.payload, loading: false }
        default:
            return state
    }
}