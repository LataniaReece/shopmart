import { createTheme } from '@mui/material';

const primaryColor =  '#2E4057';
const secondaryColor = '#312F2F';
const lightColor = '#e5e5e5';

const customTheme = createTheme({
    palette: {
        primary: {
            main: primaryColor,
        },
        secondary: {
            main: secondaryColor
        },
        light: {
            main: lightColor,
        }
    }
});

export default customTheme