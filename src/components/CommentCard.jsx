import ReactDOM from 'react-dom'

export default function CommentCard(props){
    const {comment} = props
    return (
        <div className="comment">
        <div className = "commentHeader">
        <span>{comment.author} |  {comment.created_at}</span>
        {props.children}
        </div>
        <p>{comment.body}</p>
        <span>{comment.votes} votes</span>
        </div>
    )
}