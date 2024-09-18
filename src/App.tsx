import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import Login from "./components/Login.tsx";

const queryClient = new QueryClient();

function App() {
    return (
        <>
            <Container>
                <CssBaseline/>
                <AppBar position="fixed">
                    <Toolbar>
                        <Typography variant="h6">
                            Book Store
                        </Typography>
                    </Toolbar>
                </AppBar>
                <QueryClientProvider client={queryClient}>
                    <Login/>
                </QueryClientProvider>
            </Container>
        </>
    )
}

export default App;
