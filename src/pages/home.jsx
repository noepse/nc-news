import Topics from '../components/Topics'
import Articles from '../components/Articles'
import { useState } from 'react'
import Backdrop from '@mui/material/Backdrop';
import HashLoader from "react-spinners/HashLoader";

export default function Home(props){
    const {setCurrentArticle} = props

    const [articles, setArticles] = useState(null)
    const [isLoadingArticles, setIsLoadingArticles] = useState(true)

    return (
        <>
              {isLoadingArticles ? <Backdrop
        sx={{ color: '#fff', flexDirection: 'column', gap: '1em', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoadingArticles}
      > 
        <h1>Loading articles ... </h1>
        <p>This can take up to 5 minutes.</p>
        <HashLoader
        color={'#fff'}
        loading={isLoadingArticles}
        size={70}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
      </Backdrop> : null}
        <Topics setArticles={setArticles} setIsLoadingArticles={setIsLoadingArticles}/>
        <Articles setCurrentArticle={setCurrentArticle} articles={articles} setArticles={setArticles}  isLoadingArticles={isLoadingArticles} setIsLoadingArticles={setIsLoadingArticles} />
        </>

    )
}