import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {deleteBook, getBooks} from "../api/bookapi.ts";
import {GridRowsProp} from '@mui/x-data-grid';
import Snackbar from '@mui/material/Snackbar';
import {useState} from "react";
import AddBook from "./AddBook.tsx";
import {Button, Grid2, Stack} from "@mui/material";
import BookItem from "./BookItem.tsx";

type BookListProps = {
    logOut?: () => void;
}

function BookList({logOut}: BookListProps) {
    const [open, setOpen] = useState(false);
    const {data, error, isSuccess}: GridRowsProp<any> = useQuery({
        queryKey: ["books"],
        queryFn: getBooks
    });

    const queryClient = useQueryClient();

    // const {mutate} = useMutation(deleteBook, {
    //     onSuccess: () => {
    //         setOpen(true);
    //         queryClient.invalidateQueries({queryKey: ["books"]});
    //     },
    //     onError: (err) => {
    //         console.error(err)
    //     }
    // });

    // const columns: GridColDef[] = [
    //     {field: "title", headerName: "Title", width: 200},
    //     {field: "description", headerName: "Description", width: 200},
    //     {field: "publisher", headerName: "Publisher", width: 200},
    //     {field: "price", headerName: "Price", width: 150},
    //     {field: "amount", headerName: "Amount", width: 150},
    //     {
    //         field: 'edit',
    //         headerName: '',
    //         width: 90,
    //         sortable: false,
    //         filterable: false,
    //         disableColumnMenu: true,
    //         renderCell: (params: GridCellParams) =>
    //             <EditBook bookdata={params.row}/>
    //     },
    //     {
    //         field: 'delete',
    //         headerName: '',
    //         width: 90,
    //         sortable: false,
    //         filterable: false,
    //         disableColumnMenu: true,
    //         renderCell: (params: GridCellParams) => (
    //             <IconButton
    //                 aria-label="delete"
    //                 size="small"
    //                 onClick={() => {
    //                     if (window.confirm(`Are you sure you want to delete ${params.row.title} ${params.row.publisher}?`)) {
    //                         mutate(params.row._links.book.href);
    //                     }
    //                 }}
    //             >
    //                 <DeleteIcon fontSize="small"/>
    //             </IconButton>
    //         ),
    //     },
    // ];


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
                    justifyContent="space-between">
                    <AddBook/>
                    <Button onClick={logOut}>Log out</Button>
                </Stack>
                <Grid2 container
                       direction="row"
                       spacing={2}
                       columns={30}>
                    {
                        Array.from(data).map((book, _) => (
                            <BookItem
                                image={"https://imo10.labirint.ru/books/882191/cover.png/242-0"}
                                title={book.title}
                                hidden={false}/>
                        ))
                    }
                </Grid2>
                <Snackbar
                    open={open}
                    autoHideDuration={2000}
                    onClose={() => setOpen(false)}
                    message="BookItem deleted"/>
            </>
        );
    }
}

export default BookList;