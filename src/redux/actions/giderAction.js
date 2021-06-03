import axios from 'axios';

export const getGider = () => async (dispatch) => {
    try {
        const { data } = await axios.get("http://localhost:5000/api/gider");
        dispatch({
            type: "GET_GIDER",
            payload: data
        })
    } catch (error) {

    }
}
export const setGider = ({ hesap, kategori, baslik, miktar, tarih }) => async (dispatch) => {
    try {
        const body = { hesap, kategori, baslik, miktar, tarih };
        console.log(body);
        const { data } = await axios.post("http://localhost:5000/api/gider", body);
        dispatch({
            type: "SET_GIDER",
            payload: data
        })
    } catch (error) {

    }
}

export const deleteGider = ({ id }) => async (dispatch) => {
    try {
        const { data } = await axios.delete(`http://localhost:5000/api/gider/sil/${id}`);
        dispatch({
            type: "DELETE_GIDER",
            payload: data
        })
    } catch (error) {

    }
}