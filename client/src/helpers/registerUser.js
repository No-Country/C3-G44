import Axios from 'axios';

export const registerUser = async (user) => {
    const data = {}
    await Axios.post('/user/create', user)
        .then((response) => {
            
            data['data'] = response.data;
        })
        .catch((err) => console.log(err));
    
    return data.data
};
