import * as React from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

export default function Error(props){
    const {error} = props
return (
<Alert severity="error">
  <AlertTitle>Error</AlertTitle>
  {error.msg}
</Alert>
)
}