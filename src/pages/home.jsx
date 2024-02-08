import Topics from '../components/Topics'
import Articles from '../components/Articles'
import { useState } from 'react'

export default function Home(props){
    const [allArticles, setAllArticles] = useState([])
    const [articles, setArticles] = useState(allArticles)
    const [currentTopic, setCurrentTopic] = useState('newly added')
    const {setCurrentArticle} = props
    return (
        <>
        <Topics setArticles={setArticles} allArticles={allArticles} setCurrentTopic={setCurrentTopic}/>
        <Articles setCurrentArticle={setCurrentArticle} articles={articles} setArticles={setArticles} setAllArticles={setAllArticles} currentTopic={currentTopic}/>
        </>

    )
}