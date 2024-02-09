import { Link } from "react-router-dom"
import Button from '@mui/material/Button';
import * as React from 'react';

export default function TopicCard(props){
    const {topic} = props
    return (
        <Button variant="outlined" color="secondary"><Link to = {`/articles/${topic.slug}`}>{topic.slug}</Link></Button>
    
)}