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

export const postCommentOnArticleById = (articleId, user, comment)=>{
    const requestBody = {
        username: user,
        body: comment
    }
    return api
    .post(`/articles/${articleId}/comments`, requestBody)
    .then((response) => {
        return response.data.comment
    })
    .catch((err)=>{
        console.log(err)
    })
}

export const getUserByUsername = (username)=>{
    return api
    .get(`/users/${username}`)
    .then((response) => {
        return response.data.user
    })
    .catch((err)=>{
        console.log(err)
    })
}

export const deleteCommentById = ((commentId)=>{
    return api
    .delete(`/comments/${commentId}`)
    .then((response) => {
        return response
    })
    .catch((err)=>{
        console.log(err)
    })
})

export const getTopics = ()=>{
    return api
    .get(`/topics`)
    .then((response) => {
        return response.data.topics
    })
    .catch((err)=>{
        console.log(err)
    })
}