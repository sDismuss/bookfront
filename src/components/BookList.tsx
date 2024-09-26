import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {deleteBook, getBooks} from "../api/bookapi.ts";
import {DataGrid, GridCellParams, GridColDef, GridRowsProp, GridToolbar} from '@mui/x-data-grid';
import Snackbar from '@mui/material/Snackbar';
import {useState} from "react";
import AddBook from "./AddBook.tsx";
import EditBook from "./EditBook.tsx";
import {Button, IconButton, Stack} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

type BookListProps = {
    logOut?: () => void;
}

function BookList({logOut}: BookListProps) {
    const [open, setOpen] = useState(false);
    const {data, error, isSuccess} : GridRowsProp<any> = useQuery({
        queryKey: ["books"],
        queryFn: getBooks
    });

    const queryClient = useQueryClient();

    const {mutate} = useMutation(deleteBook, {
        onSuccess: () => {
            setOpen(true);
            queryClient.invalidateQueries({queryKey: ["books"]});
        },
        onError: (err) => {
            console.error(err)
        }
    });

    const columns: GridColDef[] = [
        {field: "title", headerName: "Title", width: 200},
        {field: "description", headerName: "Description", width: 200},
        {field: "publisher", headerName: "Publisher", width: 200},
        {field: "price", headerName: "Price", width: 150},
        {field: "amount", headerName: "Amount", width: 150},
        {
            field: 'edit',
            headerName: '',
            width: 90,
            sortable: false,
            filterable: false,
            disableColumnMenu: true,
            renderCell: (params: GridCellParams) =>
                <EditBook bookdata={params.row}/>
        },
        {
            field: 'delete',
            headerName: '',
            width: 90,
            sortable: false,
            filterable: false,
            disableColumnMenu: true,
            renderCell: (params: GridCellParams) => (
                <IconButton
                    aria-label="delete"
                    size="small"
                    onClick={() => {
                        if (window.confirm(`Are you sure you want to delete ${params.row.title} ${params.row.publisher}?`)) {
                            mutate(params.row._links.book.href);
                        }
                    }}
                >
                    <DeleteIcon fontSize="small"/>
                </IconButton>
            ),
        },
    ];


    if (!isSuccess) {
        return <span>Loading...</span>
    } else if (error) {
        return <span>Error when fetching books</span>
    } else {
        return (
            <>
                <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                >
                    <AddBook/>
                    <Button onClick={logOut}>Log out</Button>
                </Stack>
                <DataGrid
                    rows={data}
                    columns={columns}
                    disableRowSelectionOnClick={true}
                    getRowId={row => row._links.self.href}
                    slots={{toolbar: GridToolbar}}
                >
                </DataGrid>
                <Snackbar
                    open={open}
                    autoHideDuration={2000}
                    onClose={() => setOpen(false)}
                    message="Book deleted"/>
            </>
        );
    }
}

export default BookList;