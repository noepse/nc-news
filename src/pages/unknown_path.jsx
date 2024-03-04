import Topics from '../components/Topics'
import { useState } from 'react'

import Error from '../components/Error'

export default function Unknown_Path(props){
    const [articles, setArticles] = useState(null)
    const [isLoadingArticles, setIsLoadingArticles] = useState(true)

    const [error, setError] = useState({msg: 'unknown path'})

    return (
        <section id="unknownPath">
        <Topics setArticles={setArticles} setIsLoadingArticles={setIsLoadingArticles}/>
        <Error error={error}/>
        </section>

    )
}