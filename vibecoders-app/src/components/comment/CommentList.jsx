import CommentItem from './CommentItem'

export default function CommentList({ comments, currentUserId, onDelete }) {
  if (!comments?.length) {
    return (
      <p className="text-text-tertiary text-sm py-4">
        No comments yet. Start the conversation.
      </p>
    )
  }

  return (
    <div className="flex flex-col">
      {comments.map((comment) => (
        <CommentItem
          key={comment.id}
          comment={comment}
          isOwn={comment.user?.id === currentUserId}
          onDelete={() => onDelete(comment.id)}
        />
      ))}
    </div>
  )
}
