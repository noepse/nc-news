import { createTheme } from '@mui/material/styles';

let theme = createTheme({
  // Theme customization goes here as usual, including tonalOffset and/or
  // contrastThreshold as the augmentColor() function relies on these
});

theme = createTheme(theme, {
  // Custom colors created with augmentColor go here
  palette: {
    purple: theme.palette.augmentColor({
      color: {
        main: '#535bf2',
      },
      name: 'purple',
    }),
  },
});

export default theme