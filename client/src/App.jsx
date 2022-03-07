import { useEffect, useReducer } from 'react';
import { UserContext } from './context/UserContext';
import { UserReducer } from './reducers/UserReducer';
import { LoginRouter } from './routers/LoginRouter';

const initUser = () => {
    return localStorage.getItem('auth') !== null
        ? {
              data: {
                  auth: JSON.parse(localStorage.getItem('auth')),
                  token: JSON.parse(localStorage.getItem('token')),
              },
              user: JSON.parse(localStorage.getItem('user')),
          }
        : { data: { auth: false, token: null }, user: null };
};

function App() {
    const [stateUser, dispatchUser] = useReducer(UserReducer, {}, initUser);
    useEffect(() => {
        localStorage.setItem('auth', JSON.stringify(stateUser.data.auth));
        localStorage.setItem('token', JSON.stringify(stateUser.data.token));
        localStorage.setItem('user', JSON.stringify(stateUser.user));
    }, [stateUser]);

    return (
        <UserContext.Provider value={{ stateUser, dispatchUser }}>
            <LoginRouter />
        </UserContext.Provider>
    );
}

export default App;
