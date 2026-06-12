import { useState } from 'react'
import { useComments } from '../../hooks/useComments'
import { validateComment } from '../../lib/validators'
import Textarea from '../ui/Textarea'
import Button from '../ui/Button'

export default function CommentInput({ projectId, userId }) {
  const { addComment } = useComments(projectId)
  const [content, setContent] = useState('')
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()

    const { valid, errors } = validateComment({ content })
    if (!valid) {
      setError(errors.content)
      return
    }

    try {
      await addComment.mutateAsync({ content, userId })
      setContent('')
      setError(null)
    } catch {
      setError('Comment failed. Try again.')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 py-4">
      <Textarea
        value={content}
        onChange={(e) => { setContent(e.target.value); setError(null) }}
        placeholder="What do you think? Be honest."
        maxLength={500}
        error={error}
      />
      <div className="flex justify-end">
        <Button type="submit" disabled={!content.trim() || addComment.isPending} size="sm">
          {addComment.isPending ? 'Posting...' : 'Post comment'}
        </Button>
      </div>
    </form>
  )
}
