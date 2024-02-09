import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

export default function NavBar(){
    return (
        <Stack spacing={2} direction="row" id = "navbar">
          <Button variant="text"><Link to= "/">home</Link></Button>
          <Button variant="outlined"><Link to = "/submit">post</Link></Button>
          <Button variant="text"><Link to = "/">browse</Link></Button>
        </Stack>
      );
}