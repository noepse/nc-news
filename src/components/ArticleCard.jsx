import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { Link } from 'react-router-dom';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);


export default function ArticleCard(props) {
    const {article, setCurrentArticle} = props

    // function handleClick(){
    //     setCurrentArticle(article)
    // }


  return (
    <Box sx={{ minWidth: 250 }} className = "articleCard">
      <Card variant="outlined">
      <CardContent>
      <img src={article.article_img_url} alt="Article Image" width="100%"></img>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        {article.topic.toUpperCase()}
      </Typography>
      <Typography variant="h5" component="div">
        {article.title}
      </Typography>
      <Typography sx={{ mb: 1.5 }} color="text.secondary">
        by {article.author}
      </Typography>
    </CardContent>
    <CardActions>
      <Button size="small" ><Link to={`/${article.article_id}`}>Read article</Link></Button>
    </CardActions>
    </Card>
    </Box>
  );
}