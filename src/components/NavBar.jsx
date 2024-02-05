import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export default function NavBar(){
    return (
        <Stack spacing={2} direction="row" id = "navbar">
          <Button variant="text">home</Button>
          <Button variant="outlined">post</Button>
          <Button variant="text">browse</Button>
        </Stack>
      );
}