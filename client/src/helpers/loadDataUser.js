import Axios from 'axios';

export const loadDataUser = async (id, token) => {
    const data = {};
    await Axios.get(
        `/user/data/${id}`,
        {
            headers: {
                Authorization: `Baered ${token}`,
            },
        }
    )
        .then((respuesta) => {
            data['data'] = respuesta.data;
        })
        .catch((err) => {
            console.log(err);
        });

    return data.data;
};
