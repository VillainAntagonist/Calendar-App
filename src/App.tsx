import React, {useEffect} from 'react';
import './App.css';
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import {Layout} from "antd";
import {useAction} from "./hooks/useAction";
import {IUser} from "./models/IUser";

function App() {
    const {setUser, setIsAuth} = useAction();

    useEffect(()=>{
        if(localStorage.getItem('isAuth')){
            setUser({username: localStorage.getItem('username'|| '')} as IUser);
            setIsAuth(true);
        }
    }, [])

    return (
        <Layout>
            <NavBar/>
            <Layout.Content>
                <AppRouter/>
            </Layout.Content>
        </Layout>
    );
}

export default App;
