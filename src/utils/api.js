import axios from 'axios';

const api = axios.create({
    baseURL: 'https://news-app-2.onrender.com/api',
  });

export const getArticles = ()=>{
    return api
    .get(`/articles`)
    .then((response) => {
        return response.data.articles
    })
}

export const getArticleById = (articleId) => {
    return api
    .get(`/articles/${articleId}`)
    .then((response) => {
        return response.data.article
    })
    .catch((err)=>{
        console.log(err)
    })
}

export const getCommentsbyId = (articleId) =>{
    return api
    .get(`/articles/${articleId}/comments`)
    .then((response) => {
        return response.data.comments
    })
    .catch((err)=>{
        console.log(err)
    })
}

export const patchVotesOnArticleById = (articleId, votes) => {
    return api
    .patch(`/articles/${articleId}`, {inc_votes: votes})
    .then((response) => {
        return response.data.article
    })
    .catch((err)=>{
        console.log(err)
    })
}