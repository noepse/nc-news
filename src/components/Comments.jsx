import * as React from "react";
import { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import { getCommentsbyId } from "../utils/api";
import CommentCard from "./CommentCard";

export default function Comments(props) {

    const [comments, setComments] = useState([])
    const [isLoading, setIsLoading] = useState(true);

    const {article_id} = props

    useEffect(()=>{
        setIsLoading(true);
        getCommentsbyId(article_id)
        .then((commentsData)=>{
            setIsLoading(false);
            setComments(commentsData);
        })
    }, [])

  return (
    <>
    {/* <section id="postCommentContainer">
      <img src="" alt="Logged in user avatar"></img>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <div>
          <TextField
            id="outlined-multiline-flexible"
            label="Enter a comment"
            multiline
            maxRows={4}
          />
        </div>
      </Box>
      <Button variant="contained">Post comment</Button>
    </section> */}
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
