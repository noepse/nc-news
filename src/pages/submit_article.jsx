import { useState, useContext, useEffect } from 'react';
import { FormControl } from '@mui/material';

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import { CurrentUserContext } from '../contexts/CurrentUser';

import { getTopics } from '../utils/api';

export default function Submit_Article(){
    const [topics, setTopics] = useState([])
    const [topic, setTopic] = useState('');
    const { currentUser } = useContext(CurrentUserContext);

    useEffect(()=>{
        getTopics().then((topics)=>{
            setTopics(topics)
        })
    }, [])

    const handleChange = (event) => {
        setTopic(event.target.value);
      };

    return (
        <section id="submit">
            <h2>Post an article </h2>
            <p>as {currentUser.username}</p>
            <FormControl>
            <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="topic-label">Topic</InputLabel>
        <Select
          labelId="topic-label"
          id="topic-select"
          value={topic}
          label="Topic"
          onChange={handleChange}
        >
            {topics.map((topic)=>{
                return <MenuItem value={topic.slug}>{topic.slug}</MenuItem>
            })}
        </Select>
      </FormControl>
    </Box>
<TextField id="title" label="Title" variant="outlined" />
<TextField id="body" label="Body" variant="outlined" multiline rows={4}/>
<Button variant="contained">Submit</Button>
</FormControl>
            </section>
        )
}