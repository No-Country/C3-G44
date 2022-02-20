import { useEffect, useReducer } from 'react';
import { UserContext } from './context/UserContext';
import { UserReducer } from './reducers/UserReducer';
import { LoginRouter } from './routers/LoginRouter';

const initUser = () => {
    return localStorage.getItem('auth') !== null
        ? { auth: JSON.parse(localStorage.getItem('auth')), user: JSON.parse(localStorage.getItem('user'))}
        : { auth: false };
};

function App() {
    const [stateUser, dispatchUser] = useReducer(UserReducer, {}, initUser);
    useEffect(() => {
        localStorage.setItem('auth', JSON.stringify(stateUser.auth));
        localStorage.setItem('user', JSON.stringify(stateUser.user));
    }, [stateUser]);

    return (
        <UserContext.Provider value={{ stateUser, dispatchUser }}>
            <LoginRouter />
        </UserContext.Provider>
    );
}

export default App;
