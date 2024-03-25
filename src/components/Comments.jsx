import * as React from "react";
import { useEffect, useState, useContext } from "react";

import { CurrentUserContext } from "../contexts/CurrentUser";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import { Tooltip, Divider } from "@mui/material";
import Stack from "@mui/material/Stack";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";

import { deleteCommentById, getCommentsbyId, postCommentOnArticleById } from "../utils/api";

import CommentCard from "./CommentCard";

export default function Comments(props) {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentInput, setCurrentInput] = useState();
  const [postCommentError, setPostCommentError] = useState(null);
  const [isPosting, setIsPosting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteCommentError, setDeleteCommentError] = useState(null);

  const { article_id } = props;
  const { currentUser } = useContext(CurrentUserContext);

  useEffect(() => {
    setIsLoading(true);
    getCommentsbyId(article_id)
    .then((commentsData) => {
      setIsLoading(false);
      setComments(commentsData);
    });
  }, []);

  function handleSubmit(event) {
    event.preventDefault();
    setIsPosting(true);
    setPostCommentError(null);
    const commentToSubmit = currentInput;
    if (!commentToSubmit) {
      setPostCommentError("Comments must contain at least one character");
      setIsPosting(false);
    } else {
      const newCommentsObj = {
        author: currentUser.username,
        body: commentToSubmit,
        created_at: 'now',
        votes: 0,
        comment_id: null,
        // must add comment_id to allow deletion without refreshing page
        // consider changing backend to return comment obj
      };
      setComments((otherComments) => {
        return [newCommentsObj, ...otherComments];
      });
      postCommentOnArticleById(
        article_id,
        currentUser.username,
        commentToSubmit
      )
        .then((commentData) => {
          setPostCommentError(null);
          setCurrentInput("");
          setComments((otherComments) => {
            let updatedNewComment = {...otherComments[0]}
            updatedNewComment.comment_id = commentData.comment_id
            return [updatedNewComment, ...otherComments.slice(1, otherComments.length)];
          })
          setIsPosting(false);
        })
        .catch((errorMsg) => {
          setPostCommentError(errorMsg);
          setIsPosting(false);
        });
    }
  }

  function handleDelete(commentId){
    setIsDeleting(true)
    deleteCommentById(commentId)
    .then(()=>{
      setComments(comments.filter((comment)=>{
        setIsDeleting(false)
        return comment.comment_id !== commentId
      }))
    })
    .catch((errorMsg)=>{
      setDeleteCommentError(errorMsg);
      setIsDeleting(false)
    })
  }

  return (
    <section id="comments">
          <Divider textAlign="left" style={{width: '100%'}}> 
                     <h3 className="styledText" style={{display: 'inline'}}> Comments </h3> ({comments.length}) </Divider>
      <section id="postCommentContainer">
        <form onSubmit={handleSubmit} className="commentForm">
          <Stack direction="row" spacing={2}>
          <Tooltip title={`Comment as ${currentUser.username}`} arrow placement="top-start">
            <Avatar alt="Logged in user avatar" src={currentUser.avatar_url} />
          </Tooltip>            <TextField
              className="commentInput"
              id="outlined-multiline-flexible"
              label="Share your thoughts"
              multiline
              maxRows={4}
              value={currentInput}
              onChange={(event) => {
                setCurrentInput(event.target.value);
              }}
            />
          </Stack>
          {postCommentError ? <p className="formError">{postCommentError}</p> : null}
          <Button
          color = "purple"
            variant="contained"
            id="postCommentBtn"
            type="submit"
            onClick={handleSubmit}
            disabled={isPosting}
          >
            Submit
          </Button>
        </form>
      </section>
      {comments.length === 0 || isLoading ? (
        <div className="comment">
          <span>{isLoading ? "Loading comments..." : "No comments"}</span>
        </div>
      ) : (
        <section className="allComments">
          {comments.map((comment) => {
            return (
              <div key = {comment.comment_id}>
                <CommentCard comment={comment}>
                  {comment.author === currentUser.username ? (
                    <IconButton
                      aria-label="delete comment"
                      disabled = {isDeleting || isPosting}
                      onClick = {()=>{
                        handleDelete(comment.comment_id)
                        
                      }}
                    >
                      <DeleteIcon className="deleteBtn"/>
                    </IconButton>
                  ) : null}
                </CommentCard>
                {deleteCommentError ? <p>{deleteCommentError}</p> : null}
              </div>
            );
          })}
        </section>
      )}
    </section>
  );
}
