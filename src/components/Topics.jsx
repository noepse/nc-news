import { useState, useEffect } from "react"
import { getArticles, getTopics } from "../utils/api"
import TopicCard from "./TopicCard"

import { Link } from "react-router-dom"
import Button from '@mui/material/Button';
import * as React from 'react';

export default function Topics(props){
    const {setArticles, setIsLoadingArticles} = props

    const [topics, setTopics] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(()=>{
        setIsLoading(true)
        getTopics()
        .then((topicsData)=>{
            setIsLoading(false)
            setTopics(topicsData)
        })
    }, [])

    function handleClick(topicName) {
        // setIsLoadingArticles(true)

        // getArticles(topicName)
        // .then((articleData)=>{
        //     setIsLoadingArticles(false)
        //     setArticles(articleData)
        // })
        }

    return (
        <>
    <section id = "topics">
            {isLoading? <p>Loading topics...</p> : (
                <>
                        {topics.map((topic)=>{
                            return <TopicCard key = {topic.slug} topic = {topic} handleClick={handleClick}/>
                        })}
        <Button variant="text" onClick={()=>{
            handleClick('')
        }}><Link to = {`/articles/all`}>view all</Link></Button>
           </> )}
    
    </section>
    </>
    )
}