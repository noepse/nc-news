import * as React from "react";
import { useEffect, useState, useContext } from "react";

import { CurrentUserContext } from '../contexts/CurrentUser';

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

import { getCommentsbyId, postCommentOnArticleById } from "../utils/api";

import CommentCard from "./CommentCard";

export default function Comments(props) {

    const [comments, setComments] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const [currentInput, setCurrentInput] = useState();
    const [newComments, setNewComments] = useState([])
    const [postCommentError, setPostCommentError] = useState(null)
    const [isPosting, setIsPosting] = useState(false);

    const {article_id} = props
    const { currentUser } = useContext(CurrentUserContext);

    useEffect(()=>{
        setIsLoading(true);
        getCommentsbyId(article_id)
        .then((commentsData)=>{
            setIsLoading(false);
            setComments(commentsData);
        })
    }, [])

    function handleSubmit(event){
      event.preventDefault()
      setIsPosting(true)
      setPostCommentError(null)
      const commentToSubmit = currentInput;
      if (!commentToSubmit){
        setPostCommentError('Comment must be at least 1 character long')
        setIsPosting(false)
      }
      else {
        const newCommentsObj = {username: currentUser.username, body: commentToSubmit}
        setNewComments((otherNewComments)=>{
          return [newCommentsObj, ...otherNewComments]
        })
        postCommentOnArticleById(article_id, currentUser.username, commentToSubmit)
        .then((commentData)=>{
        setPostCommentError(null)
        setCurrentInput('')
        setIsPosting(false)
        })
        .catch((err)=>{
          setPostCommentError(err)
          setIsPosting(false)
        })
      }

    }

  return (
    <>
    <section id="postCommentContainer">
      <form onSubmit = {handleSubmit} className = "commentForm">
        <Stack direction="row" spacing={2}>
        <Avatar alt="Logged in user avatar" src="/static/images/avatar/1.jpg" />
          <TextField className = "commentInput"
            id="outlined-multiline-flexible"
            label="Enter a comment"
            multiline
            maxRows={4}
            value = {currentInput}
            onChange={(event)=>{
              setCurrentInput(event.target.value)
            }}
          />
          </Stack>
        {postCommentError ? <p>{postCommentError}</p> : null}
      <Button variant="contained" id = "postCommentBtn" type="submit" onClick = {handleSubmit} disabled = {isPosting}>Post comment</Button>
      </form>
    </section>
    {newComments.length !== 0 ? (
      newComments.map((newComment, index)=>{
        return (
          <div className="comment" key={index}>
          <span> {newComment.username} | posted now</span>
          <p>{newComment.body}</p>
          </div> 
        )
      })
    ):(
null
    )}
        {comments.length === 0 || isLoading ? (
                    <div className="comment">
                    <span>{isLoading ? (
                        'Loading comments...' ) : (
                            'No comments'
                        )}</span>
                    </div> 
                    ) : (
                <section className="allComments">

                {comments.map((comment)=>{
                    return <CommentCard key = {comment.comment_id} comment = {comment}/>
                })}
            </section>
        )}

    </>
  );
}
