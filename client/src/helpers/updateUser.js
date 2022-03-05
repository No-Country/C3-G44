import Axios from 'axios'

export const updateUser = async (user, token, avatar = null, images = null, data = null, cv = null) => {

    const resp = {}

    const img = new FormData();
    img.append("avatar", avatar);
    images && images.map((file) => img.append("images", file));
    img.append("cv", cv);
    await Axios.put(`/admin/updatedatauser/${user}`, data, {
        headers: {
            Authorization: `Baered ${token}`,
        },
    })
        .then((response) => {
            resp['data_mensaje']= response.data.mensaje;
        })
        .catch((err) => {
            console.log(err);
        });

    await Axios.put(`/admin/updateuser/${user}`, img, {
        headers: {
            Authorization: `Baered ${token}`,
        },
    })
        .then((respuesta) => {
            resp['image_mensaje'] = respuesta.data.mensaje;
        })
        .catch((err) => {
            console.log(err);
        });
    
    return {...resp}
};