import {Book, BookEntry, BookResponse} from "../types.ts";
import * as React from "react";
import {useState} from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import BookDialogContent from "./BookDialogContent.tsx";
import DialogActions from "@mui/material/DialogActions";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {updateBook} from "../api/bookapi.ts";
import {Button, IconButton, Tooltip} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';

type FormProps = {
    bookdata: BookResponse
}

function EditBook({bookdata}: FormProps) {
    const [open, setOpen] = useState(false);
    const [book, setBook] = useState<Book>({
        title: '',
        description: '',
        publisher: '',
        price: 0.0,
        amount: 0
    });

    const queryClient = useQueryClient();

    const {mutate} = useMutation(updateBook, {
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["books"]});
        },
        onError: (err) => {
            console.error(err);
        }
    });

    const handleClickOpen = () => {
        setBook({
            title: bookdata.title,
            description: bookdata.description,
            publisher: bookdata.publisher,
            price: bookdata.price,
            amount: bookdata.amount
        });

        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = () => {
        const url = bookdata._links.self.href;
        const bookEntry: BookEntry = {book, url}
        mutate(bookEntry)
        setBook({
            title: '',
            description: '',
            publisher: '',
            price: 0.0,
            amount: 0
        })
        setOpen(false);
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setBook({...book, [event.target.name]: event.target.value});
    };

    return (
        <>
            <Tooltip title="Edit book">
                <IconButton aria-label="edit" size="small"
                            onClick={handleClickOpen}>
                    <EditIcon fontSize="small"/>
                </IconButton>
            </Tooltip>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit book</DialogTitle>
                <BookDialogContent book={book} handleChange={handleChange}/>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSave}>Save</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default EditBook;