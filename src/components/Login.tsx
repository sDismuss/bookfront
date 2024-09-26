import * as React from 'react';
import {MutableRefObject, useRef, useState} from 'react';
import {Button, Stack, TextField} from '@mui/material';
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';

import BookList from './BookList';

type User = {
    username: string;
    password: string;
}

function Login() {

    const [user, setUser] = useState<User>({
        username: '',
        password: ''
    });

    const [isAuthenticated, setAuth] = useState(false);

    const [isError, setError] = useState(false);

    const username = useRef<MutableRefObject<string>>();
    const password= useRef<MutableRefObject<string>>();

    const validate = () => {
        if (username.current === null) {
            console.log("Empty username")
        } 
        if (password.current === null) {
            console.log("Empty password")
        }
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUser({
            ...user,
            [event.target.name]: event.target.value
        });
    };


    const handleLogin = () => {
        validate();
        axios.post(
            `${import.meta.env.VITE_API_URL}/login`,
            user,
            {
                headers: {'Content-Type': 'application/json'}
            }
        ).then(
            res => {
                const {authorization: jwtToken} = res.headers;

                if (jwtToken !== null) {
                    sessionStorage.setItem("jwt", jwtToken);
                    setAuth(true);
                }
            }).catch(() => setError(true));
    };

    const handleLogout = () => {
        setAuth(false);
        sessionStorage.setItem("jwt", "");
    };

    if (isAuthenticated) {
        return <BookList logOut={handleLogout}/>
    } else {
        let element = <><>
            <Stack spacing={2}
                   alignItems="center"
                   mt={2}
            >
                <TextField
                    id={"username"}
                    label={"Username"}
                    name={"username"}
                    onChange={handleChange}/>
                <TextField
                    id={"password"}
                    type={"password"}
                    label={"Password"}
                    name={"password"}
                    onChange={handleChange}/>
                <Button
                    variant="outlined"
                    color="primary"
                    onClick={handleLogin}>
                    Login
                </Button>
            </Stack>
            <Snackbar
                open={isError}
                autoHideDuration={3000}
                onClose={() => setError(false)}
                message="Login failed: Check your username and password"
            />
        </>
        </>;
        return element;
    }
}

export default Login;