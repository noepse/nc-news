export default function CommentCard(props){
    const {comment} = props
    return (
        <div className="comment">
        <span>{comment.author} </span>
        <span>|  {comment.created_at}</span>
        <p>{comment.body}</p>
        <span>{comment.votes} votes</span>
        </div>
    )
}