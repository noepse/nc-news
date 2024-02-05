import axios from 'axios';

export const getArticles = ()=>{
    return axios
    .get(`https://news-app-2.onrender.com/api/articles`)
    .then((response) => {
        return response.data.articles
    })
}

export const getArticleById = (articleId) => {
    return axios
    .get(`https://news-app-2.onrender.com/api/articles/${articleId}`)
    .then((response) => {
        return response.data.article
    })
    .catch((err)=>{
        console.log(err)
    })
}