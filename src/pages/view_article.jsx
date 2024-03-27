import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';

import { getArticleById, deleteArticleById, patchVotesOnArticleById } from '../utils/api';

import { CurrentUserContext } from '../contexts/CurrentUser';

import Comments from '../components/Comments';
import Error from '../components/Error';

import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import { Backdrop } from '@mui/material';
import { Checkmark } from 'react-checkmark'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp as solidThumbsUp, faThumbsDown as solidThumbsDown } from '@fortawesome/free-solid-svg-icons'
import { faThumbsUp as outlineThumbsUp, faThumbsDown as outlineThumbsDown } from '@fortawesome/free-regular-svg-icons'
import AlertDialog from '../components/Dialog';

export default function View_Article(){

    const [currentArticle, setCurrentArticle] = useState({})
    const [currentVotes, setCurrentVotes] = useState(null)
    const [isLoading, setIsLoading] = useState(true);
    const [isDeleting, setIsDeleting] = useState(false)
    const [isUpVoted, setIsUpVoted] = useState(false);
    const [isDownVoted, setIsDownVoted] = useState(false);

    const [openDialog, setOpenDialog] = useState(false);
    const [openBackdrop, setOpenBackdrop] = useState(false)

    const {currentUser} = useContext(CurrentUserContext)

    const [error, setError] = useState({apiError: null, voteError: null})

    const { article_id } = useParams();

    useEffect(()=>{
        setIsLoading(true);
        scrollToTop();
        getArticleById(article_id)
        .then((articleData)=>{
            setError(false)
            setIsLoading(false);
            setCurrentArticle(articleData)
            setCurrentVotes(articleData.votes)
        })
        .catch((error)=>{
            setError({apiError: error})
            setIsLoading(false);
        })
    }, [article_id])

    function scrollToTop(){
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    }

    function handleVote(vote){
        let votes = 0
        if (vote === 'upvote'){ 
            votes = 1
            if (isUpVoted){ 
                votes = -1 
            }
            if (isDownVoted){
                votes = 2
            }
            setIsUpVoted(!isUpVoted) 
            setIsDownVoted(false) 
        }
        if (vote === 'downvote'){
            votes = -1
            if (isDownVoted){
                votes = 1 
            }
            if (isUpVoted){
                votes = -2
            }
            setIsDownVoted(!isDownVoted)
            setIsUpVoted(false)
        }

        setCurrentVotes(currentVotes + votes)

        patchVotesOnArticleById(article_id, votes)
        .then((articleData)=>{
            setError(false)
            setCurrentArticle(articleData)
        })
        .catch((err)=>{
            setError({voteError: err});
        })
    }

    function openPopUp(){
        setOpenDialog(true)
    }

    function closeBackdrop(){
        setOpenBackdrop(false)
    }

    function handleDelete(){
        setIsDeleting(true)
        deleteArticleById(article_id)
        .then(()=>{
            setIsDeleting(false)
            setOpenDialog(false)
            setOpenBackdrop(true)
        })
    }

return (
    <>
{openBackdrop ? <Backdrop
  sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1, display: 'flex', flexDirection: 'column' , gap: '2em'}}
  open={openBackdrop}
  onClick={closeBackdrop}
>
<h1>Article Deleted</h1>
<Checkmark size='90px' color='green' />
</Backdrop> : null}
    <AlertDialog openDialog={openDialog} setOpenDialog={setOpenDialog} title={'Delete this article?'} message={'Please confirm that you wish to delete this article. This action cannot be undone.'} action={handleDelete}/>
        { error.apiError || isLoading ? (
            error.apiError ? <Error error={error.apiError}/> : <p>Loading article ... </p>
         ) : (
<main id="fullArticle">
<img src={currentArticle.article_img_url} width = "100%" alt="related article image"></img>
    <article style={{width: '100%'}}>
        <div id = "articleCounts">
        
            <span>{currentVotes} votes </span> 
      <span><a href="#comments">{currentArticle.comment_count} comments </a></span>
            {currentUser.username === currentArticle.author ? <Button color="error" onClick={openPopUp}>Delete</Button> : null}
        </div>
        
        <h2 className="styledText">{currentArticle.title}</h2>

        
      
      
      {error.voteError ? <p>{error.voteError.msg}</p>: null}
      
        <h4 id = "articleTopic">{currentArticle.topic}</h4>
        <h3 className="styledText">by {currentArticle.author}</h3>
        <h5 className="timestamp">{currentArticle.created_at}</h5>
        <p>{currentArticle.body}</p>
    </article>
    <Stack direction="row" spacing={1}>
    <IconButton aria-label="upvote article" onClick = {()=>{
            handleVote('upvote')
        }} >
        <FontAwesomeIcon className="voteBtn" icon={isUpVoted? solidThumbsUp : outlineThumbsUp} size='sm'/> 
      </IconButton>
    <IconButton aria-label="downvote article" onClick = {(event)=>{
            handleVote('downvote')
        }} >
        <FontAwesomeIcon className = "voteBtn" icon={isDownVoted? solidThumbsDown : outlineThumbsDown} size='sm'/> 
      </IconButton>
      </Stack>
    <Comments article_id={article_id}/>
    <Stack direction="row" spacing={2}>
      <Button variant="outlined" onClick = {scrollToTop} color='purple'>Top</Button>
    </Stack></main>
        )} </>
    )
}