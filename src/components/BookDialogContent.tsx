import {Book} from "../types.ts";
import * as React from "react";
import DialogContent from "@mui/material/DialogContent";
import {Stack, TextField} from "@mui/material";

type DialogFormProps = {
    book: Book;
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function BookDialogContent({book, handleChange}: DialogFormProps) {
    return (
        <DialogContent>
            <Stack spacing={2} mt={1}>
                <TextField label={"Title"} name={"title"} value={book.title} onChange={handleChange}/>
                <TextField label={"Description"} name={"description"} value={book.description}
                           onChange={handleChange}/>
                <TextField label={"Publisher"} name={"publisher"} value={book.publisher} onChange={handleChange}/>
                <TextField label={"Price"} name={"price"} value={book.price} onChange={handleChange}/>
                <TextField label={"Amount"} name={"amount"} value={book.amount} onChange={handleChange}/>
            </Stack>
        </DialogContent>
    )
}

export default BookDialogContent;