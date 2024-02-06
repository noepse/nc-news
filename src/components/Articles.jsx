import ArticleCard from './ArticleCard.jsx'
import { useEffect, useState } from 'react'
import { getArticles } from '../utils/api.js'

export default function Articles(props){
    const {setCurrentArticle} = props
    const [articles, setArticles] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    useEffect(()=>{
        setIsLoading(true)
        getArticles().then((articlesData)=>{
            setIsLoading(false)
            setArticles(articlesData)
        })
    }, [])
    return (
        <>
        <h2>recently added</h2>
        {isLoading? <p>Loading articles...</p> : (
    <main id="articles">
            {articles.map((article)=>{
                return <ArticleCard key = {article.article_id} article = {article} setCurrentArticle={setCurrentArticle}/>
            })}
    </main>
        )}
        </>
    )
}