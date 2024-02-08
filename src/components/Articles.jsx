import ArticleCard from './ArticleCard.jsx'
import Sorter from './Sorter.jsx'
import { useEffect, useState } from 'react'
import { getArticles } from '../utils/api.js'

export default function Articles(props){
    const {setCurrentArticle, articles, setArticles, setAllArticles, currentTopic} = props
    const [isLoading, setIsLoading] = useState(true)
    useEffect(()=>{
        setIsLoading(true)
        getArticles().then((articlesData)=>{
            setIsLoading(false)
            setArticles(articlesData.slice(0, 4))
            setAllArticles(articlesData)
        })
    }, [])
    return (
        <>
        <div className="sortHeader">
        <h2>{currentTopic}</h2>
        <Sorter />
        </div>
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