import { useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '../lib/supabase'

export function useComments(projectId) {
  const queryClient = useQueryClient()

  const addComment = useMutation({
    mutationFn: async ({ content, userId }) => {
      const { data, error } = await supabase
        .from('comments')
        .insert({ project_id: projectId, user_id: userId, content: content.trim() })
        .select(`
          id, content, created_at,
          user:users(id, username, display_name, avatar_url)
        `)
        .single()

      if (error) throw error
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['project', projectId] })
    }
  })

  const deleteComment = useMutation({
    mutationFn: async (commentId) => {
      const { error } = await supabase
        .from('comments')
        .delete()
        .eq('id', commentId)

      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['project', projectId] })
    }
  })

  return { addComment, deleteComment }
}
