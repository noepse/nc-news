import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

import { getArticleById, patchVotesOnArticleById } from '../utils/api';

import Comments from '../components/Comments';
import Error from '../components/Error';

import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp as solidThumbsUp, faThumbsDown as solidThumbsDown } from '@fortawesome/free-solid-svg-icons'
import { faThumbsUp as outlineThumbsUp, faThumbsDown as outlineThumbsDown } from '@fortawesome/free-regular-svg-icons'

export default function View_Article(){

    const [currentArticle, setCurrentArticle] = useState({})
    const [currentVotes, setCurrentVotes] = useState(null)
    const [isLoading, setIsLoading] = useState(true);
    const [isUpVoted, setIsUpVoted] = useState(false);
    const [isDownVoted, setIsDownVoted] = useState(false);
    const [isVoted, setIsVoted] = useState(false)

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
    }, [])

    function scrollToTop(){
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    }

    function handleVote(votes){
        if (votes === 1){
            setIsUpVoted(!isUpVoted)
        }
        if (votes === -1){
            setIsDownVoted(!isDownVoted)
        }

        if(isVoted){
            votes = -votes
        }
        setCurrentVotes(currentVotes + votes)
        setIsVoted(!isVoted)

        patchVotesOnArticleById(article_id, votes)
        .then((articleData)=>{
            setError(false)
            setCurrentArticle(articleData)
        })
        .catch((err)=>{
            setError({voteError: err});
        })
    }

return (
    <>
        { error.apiError || isLoading ? (
            error.apiError ? <Error error={error.apiError}/> : <p>Loading article ... </p>
         ) : (
<main id="fullArticle">
<img src={currentArticle.article_img_url} width = "100%" alt="related article image"></img>
    <article>
        <div id = "articleCounts">
            <span>{currentVotes} votes </span> <span><a href="#comments">{currentArticle.comment_count} comments </a></span>
        </div>
        
        <h2>{currentArticle.title}</h2>

        <IconButton aria-label="upvote article" onClick = {()=>{
            handleVote(1)
        }} disabled = {isDownVoted} >
        <FontAwesomeIcon className="voteBtn" icon={isUpVoted? solidThumbsUp : outlineThumbsUp}/> 
      </IconButton>
      <IconButton aria-label="downvote article" onClick = {()=>{
            handleVote(-1)
        }} disabled = {isUpVoted}>
        <FontAwesomeIcon className = "voteBtn" icon={isDownVoted? solidThumbsDown : outlineThumbsDown}/> 
      </IconButton>
      
      {error.voteError ? <p>{error.voteError.msg}</p>: null}
      
        <h4 id = "articleTopic">{currentArticle.topic}</h4>
        <h3>by {currentArticle.author}</h3>
        <h5 className="timestamp">{currentArticle.created_at}</h5>
        <p>{currentArticle.body}</p>
    </article>
    <Comments article_id={article_id}/>
    <Stack direction="row" spacing={2}>
      <Button variant="outlined" onClick = {scrollToTop} color='purple'>Top</Button>
    </Stack></main>
        )} </>
    )
}