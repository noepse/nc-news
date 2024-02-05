import Topics from '../components/Topics'
import Articles from '../components/Articles'

export default function Home(props){
    const {setCurrentArticle} = props
    return (
        <>
        <Topics />
        <Articles setCurrentArticle={setCurrentArticle}/>
        </>

    )
}