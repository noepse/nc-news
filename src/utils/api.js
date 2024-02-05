import axios from 'axios';

export const getArticles = ()=>{
    return axios
    .get(`https://news-app-2.onrender.com/api/articles`)
    .then((response) => {
        console.log(response.data.articles)
        return response.data.articles
    })
}