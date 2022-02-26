import Axios from "axios";

export const loadPorfolioUser = async (id) => {
    const data = {}
    await Axios.get(`/user/${id}`)
        .then((respuesta) => {
            data['data'] = respuesta.data;
        })
        .catch((err) => {
            console.log(err);
        });
    
    return data.data;
};
