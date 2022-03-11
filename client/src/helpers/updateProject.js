import Axios from 'axios';
import Swal from 'sweetalert2';

export const updateProject = async (
    user,
    token,
    images = null,
    data = null,
    number = null
) => {
    const res = {};

    const img = new FormData();
    img.append('images', images)
    img.append('number', number);
    data.map((element) => img.append(`${element?.name}`, element?.value));
    
    await Axios.put(`/user/updatedproject/${user}`, img, {
        headers: {
            Authorization: `Baered ${token}`,
        },
    })
        .then((response) => {
            res['data_mensaje'] = response.data.mensaje;
            let timerInterval;
            Swal.fire({
                title: response.data.mensaje,
                icon: 'success',
                timer: 2000,
                timerProgressBar: true,
                willClose: () => {
                    clearInterval(timerInterval);
                },
            });
        })
        .catch((err) => {
            console.log(err);
        });

    // await Axios.put(`/user/updateimgproject/${user}`, img, {
    //     headers: {
    //         Authorization: `Baered ${token}`,
    //     },
    // })
    //     .then((respuesta) => {
    //         res['image_mensaje'] = respuesta.data.mensaje;
    //     })
    //     .catch((err) => {
    //         console.log(err);
    //     });

    // return { ...res };
};
