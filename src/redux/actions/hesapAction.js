import axios from 'axios';

export const getHesap = () => async (dispatch) => {
    try {
        const { data } = await axios.get("http://localhost:5000/api/hesap");
        dispatch({
            type: "GET_HESAP",
            payload: data
        })
    } catch (error) {

    }
}

export const setHesap = ({ hesapAdi, hesapMiktari, hesapTuru }) => async (dispatch) => {
    try {
        const body = { hesapAdi, hesapMiktari, hesapTuru };
        const { data } = await axios.post("http://localhost:5000/api/hesap", body);
        dispatch({
            type: "SET_HESAP",
            payload: data
        })
    } catch (error) {

    }
}

export const deleteHesap = ({ id }) => async (dispatch) => {
    try {
        const { data } = await axios.delete(`http://localhost:5000/api/hesap/sil/${id}`);
        dispatch({
            type: "DELETE_HESAP",
            payload: data
        })
    } catch (error) {

    }
}