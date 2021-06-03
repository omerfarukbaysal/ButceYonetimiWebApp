import axios from 'axios';

export const getGelir = () => async (dispatch) => {
    try {
        const { data } = await axios.get("http://localhost:5000/api/gelir");
        dispatch({
            type: "GET_GELIR",
            payload: data
        })
    } catch (error) {

    }
}

export const setGelir = ({ hesap, baslik, miktar, tarih }) => async (dispatch) => {
    try {
        const body = { hesap, baslik, miktar, tarih };
        const { data } = await axios.post("http://localhost:5000/api/gelir", body);
        dispatch({
            type: "SET_GELIR",
            payload: data
        })
    } catch (error) {

    }
}

export const deleteGelir = ({ id }) => async (dispatch) => {
    try {
        const { data } = await axios.delete(`http://localhost:5000/api/gelir/sil/${id}`);
        dispatch({
            type: "DELETE_GELIR",
            payload: data
        })
    } catch (error) {

    }
}