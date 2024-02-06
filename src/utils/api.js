import axios from 'axios';

const baseURL = 'https://news-app-2.onrender.com/api'

export const getArticles = ()=>{
    return axios
    .get(`${baseURL}/articles`)
    .then((response) => {
        return response.data.articles
    })
}

export const getArticleById = (articleId) => {
    return axios
    .get(`${baseURL}/articles/${articleId}`)
    .then((response) => {
        return response.data.article
    })
    .catch((err)=>{
        console.log(err)
    })
}

export const getCommentsbyId = (articleId) =>{
    return axios
    .get(`${baseURL}/articles/${articleId}/comments`)
    .then((response) => {
        return response.data.comments
    })
    .catch((err)=>{
        console.log(err)
    })
}

export const patchVotesOnArticleById = (articleId, votes) => {
    return axios
    .patch(`${baseURL}/articles/${articleId}`, {inc_votes: votes})
    .then((response) => {
        return response.data.article
    })
    .catch((err)=>{
        console.log(err)
    })
}