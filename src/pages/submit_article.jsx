import { useState, useContext, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { FormControl } from '@mui/material';

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Backdrop from '@mui/material/Backdrop';
import HashLoader from "react-spinners/HashLoader";

import Error from '../components/Error';
import AutosizeTextArea from '../components/AutosizeTextArea';

import { CurrentUserContext } from '../contexts/CurrentUser';

import { getTopics, postArticle } from '../utils/api';

export default function Submit_Article(){
  const navigate = useNavigate();

    const [topics, setTopics] = useState([])
    const [topic, setTopic] = useState('')
    const [imageUrl, setImageUrl] = useState('')

    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')

    const [isLoading, setIsLoading] = useState(false)
    const [isPosting, setIsPosting] = useState(false)
    const [error, setError] = useState('')

    const { currentUser } = useContext(CurrentUserContext);

    const regex = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/g

    useEffect(()=>{
      setIsLoading(true)
        getTopics()
        .then((topics)=>{
            setTopics(topics)
            setIsLoading(false)
        })
        .catch(()=>{
          setIsLoading(false)
        })
    }, [])

    const handleChange = (event) => {
        setTopic(event.target.value);
      };

      const handleSubmit = () => {
        setIsPosting(true)
        if (!title || !body || !topic){
          setError({msg: 'Please fill out all required fields'})
          setIsPosting(false)
          return
        }
        postArticle({
          author: currentUser.username,
          title,
          body,
          topic,
          article_img_url: imageUrl
          }).then((articleData)=>{
            console.log(articleData)
            navigate(`/${articleData.article_id}`);
            setIsPosting(false)
        }).catch((error)=>{
setError(error)
setIsPosting(false)
        })
      };

    return (
      <>
      {isLoading ? <Backdrop
        sx={{ color: '#fff', flexDirection: 'column', gap: '1em', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      > 
        <h1>Loading form ... </h1>
        <HashLoader
        color={'#fff'}
        loading={isLoading}
        size={70}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
      </Backdrop> : null}

        <section id="submit">
          <div id="formHeader">
            <h2>Post an article </h2>
            <p>as <span class="highlightText">{currentUser.username ? currentUser.username : '...'}</span></p>
            </div>
            {error? <Error error = {error}></Error> : null}
                          <div id="imagePreview">{regex.test(imageUrl)? <img src={imageUrl} width="150px"></img> : 'no image' }</div>
            <Box id="form" component='form' onSubmit = {(event)=>{
event.preventDefault()
handleSubmit()
            }} style={{display: 'flex', flexDirection: 'column', gap: '0.5em'}}>
                                      <TextField id="image" label="Image URL" variant="outlined" value={imageUrl} onChange={(event)=>{
                                          setImageUrl(event.target.value)
                                      }}/>
                                              <FormControl fullWidth>
        <InputLabel id="topic-label">Topic *</InputLabel>
        <Select
          labelId="topic-label"
          id="topic-select"
          value={topic}
          label="Topic"
          onChange={handleChange}
          required
        >
            {topics.map((topic)=>{
                return <MenuItem value={topic.slug} key = {topic.slug}>{topic.slug}</MenuItem>
            })}
        </Select>
        </FormControl>
<TextField required id="title" label="Title" variant="outlined" value={title} onChange={(event)=>{
                                      
                                          setTitle(event.target.value)
                                      }}/>
<AutosizeTextArea body={body} onChange={(event)=>{
    setBody(event.target.value)}}/>
<Button id="submitBtn" variant="contained" disabled={isPosting || isLoading} type="submit">Submit</Button>
</Box>
            </section>
            </>
        )

}