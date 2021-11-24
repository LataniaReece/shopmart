import { createTheme } from '@mui/material';

const primaryColor =  '#8e9aaf';
const lightColor = '#e5e5e5';

const customTheme = createTheme({
    palette: {
        primary: {
            main: primaryColor,
        },
        light: {
            main: lightColor,
        }
    }
});

export default customTheme