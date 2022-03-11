import { UserTypes } from "../types/UserTypes";


export const UserReducer = (state, action) => {
    switch (action.type) {
        case UserTypes.load:
            state = action.payload;
            return state;
        case UserTypes.update:
            return [action.payload];
        case UserTypes.logout:
            return {user: null, data: {auth: null, token: null}};
        default:
            console.log('reducer');
            return state;
    }
}