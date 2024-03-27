import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp as solidThumbsUp, faThumbsDown as solidThumbsDown } from '@fortawesome/free-solid-svg-icons'
import { faThumbsUp as outlineThumbsUp, faThumbsDown as outlineThumbsDown } from '@fortawesome/free-regular-svg-icons'

import { patchVotesOnCommentById } from '../utils/api';

export default function CommentCard(props){
    const {comment, isPosting, isDeleting} = props

    const [currentVotes, setCurrentVotes] = useState(comment.votes)
    const [isUpVoted, setIsUpVoted] = useState(false);
    const [isDownVoted, setIsDownVoted] = useState(false);
    

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

        patchVotesOnCommentById(comment.comment_id, votes)
        .then((commentData)=>{
            console.log('voted')
        })
    }

    return (
        <div className="comment">
        <div className = "commentHeader">
        <span>{comment.author} |  {comment.created_at}</span>
        {props.children}
        </div>
        <p>{comment.body}</p>
        <div>
        <IconButton aria-label="upvote article" disabled={isPosting || isDeleting} onClick = {()=>{
            handleVote('upvote')
        }} >
        <FontAwesomeIcon className="voteBtn" icon={isUpVoted? solidThumbsUp : outlineThumbsUp} size='sm' /> 
      </IconButton>
        <span>{currentVotes} votes</span>
        <IconButton aria-label="downvote article" disabled={isPosting || isDeleting} onClick = {(event)=>{
            handleVote('downvote')
        }} >
        <FontAwesomeIcon className = "voteBtn" icon={isDownVoted? solidThumbsDown : outlineThumbsDown} size='sm' /> 
      </IconButton>
      </div>
        </div>
    )
}