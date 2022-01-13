import React from 'react';
import { createTheme, ThemeProvider as Provider} from '@mui/material/styles';

const theme = createTheme({
    palette : {
        myprimary : {
            main : 'rgb(121,120,114)',
            dark : 'rgb(81,80,74)',
        },
        mytext : {
            main : 'rgb(253,246,214)',
            background : "orange",
        }
    },
    typography : {
        h1 : {
            //Normal font
            fontFamily : "FranklinGothicBookRegular",
            fontSize : "2rem",
            fontWeight : 800,
        },
        h2 : {
            //Curvy font
            fontSize : "5rem",
            fontWeight : 800,
        },
        h4 : {
            fontFamily : "FranklinGothicHeavyRegular",
            fontSize : "1.5rem",
            fontWeight : 800,
        },
        subtitle1 : {
            fontFamily : "FranklinGothicBookRegular",
            fontSize : "1.2rem",
            fontWeight : 600,
        },
        subtitle2 : {
            fontFamily : "FranklinGothicBookRegular",
            fontSize : "1rem",
            fontWeight : 600,
        },
        body1 : {
            fontFamily : "FranklinGothicBookRegular",
            fontSize : "0.8rem",
            fontWeight : 600,
        },
        body2 : {
            fontFamily : "FranklinGothicBookRegular",
            fontWeight : 400,
            fontSize : "0.8rem",
        }
    }
});

export default function ThemeProvider({children}) {
    return (
        <Provider theme={theme}>
            {children}
        </Provider>
    )
}