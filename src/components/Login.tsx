import * as React from "react";
import {useState} from "react";
import {Button, Stack, TextField} from "@mui/material";
import axios from "axios";
import Booklist from "./Booklist.tsx";
import Snackbar from "@mui/material/Snackbar";

type User = {
    username: string;
    password: string;
}

function Login() {

    const [user, setUser]: User = useState({
        username: '',
        password: ''
    });

    const [isAuthenticated, setAuth]: boolean = useState(false);

    const [isError, setError] = useState(false)

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUser({
            ...user,
            [event.target.name]: event.target.value
        });
    };

    const handleLogin = () => {
        axios.post(
            `${import.meta.env.VITE_API_URL}/login`,
            user,
            {
                headers: {'Content-Type': 'application/json'}
            }
        ).then(res => {
            const jwtToken = res.headers.authorization;

            if (jwtToken !== null) {
                localStorage.setItem("jwt", jwtToken);
                setAuth(true);
            }
        }).catch(() => setError(true));
    };

    const handleLogout = () => {
        setAuth(false);
        localStorage.setItem("jwt", "");
    };

    if (isAuthenticated) {
        return <Booklist logOut={handleLogout}/>
    } else {
        return (
            <>
                <Stack spacing={2}
                       mt={1}
                >
                    <TextField label={"Username"} name={"username"} onChange={handleChange}/>
                    <TextField label={"Password"} name={"password"} onChange={handleChange}/>
                    <Button variant="outlined" color="primary" onClick={handleLogin}>Login</Button>
                </Stack>
                <Snackbar
                    open={isError}
                    autoHideDuration={3000}
                    onClose={() => setError(false)}
                    message="Login failed: Check your username and password"
                />
            </>


        )
    }
}

export default Login;