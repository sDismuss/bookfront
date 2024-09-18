import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import * as React from "react";
import {useState} from "react";
import {Book} from "../types.ts";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {addBook} from "../api/bookapi.ts";
import BookDialogContent from "./BookDialogContent.tsx";
import {Button} from "@mui/material";

function AddBook() {
    const [open, setOpen] = useState(false);
    const [book, setBook] = useState<Book>({
        title: '',
        description: '',
        publisher: '',
        price: 0.0,
        amount: 0
    });

    const queryClient = useQueryClient();

    const {mutate} = useMutation(addBook, {
        onSuccess: () => {
            setOpen(true);
            queryClient.invalidateQueries({queryKey: ["books"]});
        },
        onError: (err) => {
            console.error(err);
        }
    });

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setBook({...book, [event.target.name]: event.target.value});
    };

    const handleSave = () => {
        mutate(book);
        setBook({
            title: '',
            description: '',
            publisher: '',
            price: 0.0,
            amount: 0
        });
        handleClose();
    };

    return (
        <>
            <Button onClick={handleClickOpen}>Add book</Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>New book</DialogTitle>
                <BookDialogContent book={book} handleChange={handleChange}/>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSave}>Add</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default AddBook;