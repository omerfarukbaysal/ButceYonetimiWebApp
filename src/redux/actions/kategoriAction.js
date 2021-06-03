import axios from 'axios';

export const getKategori = () => async (dispatch) => {
    try {
        const { data } = await axios.get("http://localhost:5000/api/kategori");
        dispatch({
            type: "GET_KATEGORI",
            payload: data
        })
    } catch (error) {

    }
}

export const setKategori = ({ kategoriAdi }) => async (dispatch) => {
    try {
        const body = { kategoriAdi };
        const { data } = await axios.post("http://localhost:5000/api/kategori", body);
        dispatch({
            type: "SET_KATEGORI",
            payload: data
        })
    } catch (error) {

    }
}