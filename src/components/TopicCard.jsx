import { Link } from "react-router-dom"
import Button from '@mui/material/Button';
import * as React from 'react';

export default function TopicCard(props){
    const {topic, handleClick} = props
    return (
        <Button variant="outlined" color="secondary" onClick={()=>{
            handleClick(topic.slug)
        }}><Link to = {`/articles/${topic.slug}`}>{topic.slug}</Link></Button>
    
)}