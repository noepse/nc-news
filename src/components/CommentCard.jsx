import ReactDOM from 'react-dom'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faHeart } from '@fortawesome/free-solid-svg-icons'

export default function CommentCard(props){
    const {comment} = props
    return (
        <div className="comment">
        <span>{comment.author} </span>
        <span>|  {comment.created_at}</span>
        <p>{comment.body}</p>
        {/* <FontAwesomeIcon icon={faHeart} /> */}
        <span>{comment.votes} votes</span>
        </div>
    )
}