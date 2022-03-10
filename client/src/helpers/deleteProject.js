import Axios from 'axios';
import Swal from 'sweetalert2';

export const deleteProject = async (id, token, data) => {
    await Axios.put(`/user/removeproject/${id}`, { data }, {
        headers: {
            Authorization: `Baered ${token}`,
        },
    })
        .then((response) => {
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
};
