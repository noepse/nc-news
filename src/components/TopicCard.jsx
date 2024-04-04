import { Link } from "react-router-dom"
import Button from '@mui/material/Button';
import * as React from 'react';

export default function TopicCard(props){
    const {topic} = props
    return (
        <Link to = {`/articles/${topic.slug}`} id="topicHeader">{topic.slug}</Link>
    
)}