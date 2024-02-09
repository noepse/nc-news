import axios from 'axios';

const api = axios.create({
    baseURL: 'https://news-app-2.onrender.com/api',
  });

export const getArticles = (topic, query)=>{
    const {sort_by, order} = query

    let queryStr = ''

    // could use axios params - however need to implement logic to exclude comment_count and votes from sort_by
    if(topic && topic !== 'all'){
        queryStr=`topic=${topic}&`
    }
    if (query && query.sort_by && query.sort_by !== 'comment_count' && query.sort_by !== 'votes'){
        queryStr+=`sort_by=${query.sort_by}&`
    }
    if (query && query.order){
        queryStr += `order_by=${query.order}`
    }

    return api
    .get(`/articles/?${queryStr}`, 
    // {
    //     params: {
    //         topic: topic,
    //         sort_by: sort_by,
    //         order_by: order
    //     }
    // }
    )
    .then((response) => {
        return response.data.articles
    })
    .catch((err)=>{
        return Promise.reject(err.response.data)
    })
}

export const getArticleById = (articleId) => {
    return api
    .get(`/articles/${articleId}`)
    .then((response) => {
        return response.data.article
    })
    .catch((err)=>{
        return Promise.reject(err.response.data)
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