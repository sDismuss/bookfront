import * as React from "react";
import {Button, Grid2, styled} from "@mui/material";

const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
    height: 330,
    width: 222,
});

type BookProps = {
    image: string;
    title: string;
    hidden: boolean;
};

function BookItem({image, title, hidden}: BookProps) {
    return (
        <>
            <Grid2 size={{xs: 30,
                sm: 15,
                md: 10,
                lg: 7,
                xl: 5}}
            hidden={hidden}>
                <Grid2 container
                       direction="column"
                       spacing="2">
                    <Grid2 item>
                        <Img src={image}/>
                    </Grid2>
                    <Grid2 item>
                        <p>{title}</p>
                    </Grid2>
                    <Grid2 container
                           direction="row">
                        <Grid2 item>
                            <Button>В корзину</Button>
                        </Grid2>
                        <Grid2 item
                               sx={{
                                   justifyContent: "space-between",
                                   alignItems: "center",
                               }}>
                            <Button>Лайк</Button>
                        </Grid2>
                    </Grid2>
                </Grid2>
            </Grid2>
        </>
    );
}

export default BookItem;