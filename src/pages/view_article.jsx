import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getArticleById } from '../utils/api';

import Comments from '../components/Comments';

import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

export default function View_Article(){

    const [currentArticle, setCurrentArticle] = useState({})
    const [isLoading, setIsLoading] = useState(true);

    const { article_id } = useParams();

    useEffect(()=>{
        setIsLoading(true);
        scrollToTop();
        getArticleById(article_id)
        .then((articleData)=>{
            setIsLoading(false);
            setCurrentArticle(articleData)
        })
    }, [])

    function scrollToTop(){
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    }

return (
    <>
        {  isLoading ? (
            <>
            <p>loading article ... </p>
          </>
         ) : (
<>
    <main id="fullArticle">
        <img src={currentArticle.article_img_url} width = "100%"></img>
        <div id = "articleCounts">
            <span>{currentArticle.votes} votes </span> <span>{currentArticle.comment_count} comments </span>
        </div>
        <h2>{currentArticle.title}</h2>
        <h4 id = "articleTopic">{currentArticle.topic}</h4>
        <h3>by {currentArticle.author}</h3>
        <h5>{currentArticle.created_at}</h5>
        <p>{currentArticle.body}</p>
    </main>
    <Comments article_id={article_id}/>
    <Stack direction="row" spacing={2}>
      <Button variant="outlined" onClick = {scrollToTop}>Top</Button>
    </Stack></>
        )} </>
    )
}