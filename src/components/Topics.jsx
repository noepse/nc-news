import { useState, useEffect } from "react"
import { getTopics } from "../utils/api"
import TopicCard from "./TopicCard"
import { useNavigate } from 'react-router-dom';

import { Link } from "react-router-dom"
import Button from '@mui/material/Button';
import * as React from 'react';


export default function Topics(props){
    const {setArticles, allArticles, setCurrentTopic} = props

    const [topics, setTopics] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const navigate = useNavigate();

    useEffect(()=>{
        setIsLoading(true)
        getTopics()
        .then((topicsData)=>{
            setIsLoading(false)
            setTopics(topicsData)
        })
    }, [])

    function handleClick(topicName) {
        setCurrentTopic(topicName)
        setArticles(()=>{
            if(topicName==='all articles'){
                return allArticles
            }
            return allArticles.filter((article)=>{
                return article.topic === topicName
            })
        })
        }

    return (
        <>
    <section id = "topics">
        {topics.map((topic)=>{
            return <TopicCard key = {topic.slug} topic = {topic} handleClick={handleClick}/>
        })}
        <Button variant="text" onClick={()=>{
            handleClick('all articles')
        }}><Link to = {`/articles/all`}>view all</Link></Button>
    
    </section>
    </>
    )
}