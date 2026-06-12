import { useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '../lib/supabase'

export function useReactions(projectId, userId) {
  const queryClient = useQueryClient()

  const toggleReaction = useMutation({
    mutationFn: async (type) => {
      // Check existing reaction
      const { data: existing } = await supabase
        .from('reactions')
        .select('id, reaction_type')
        .eq('project_id', projectId)
        .eq('user_id', userId)
        .maybeSingle()

      if (existing) {
        if (existing.reaction_type === type) {
          // Toggle off
          const { error } = await supabase
            .from('reactions')
            .delete()
            .eq('id', existing.id)
          if (error) throw error
          return { action: 'removed', type }
        } else {
          // Switch reaction
          const { error } = await supabase
            .from('reactions')
            .update({ reaction_type: type })
            .eq('id', existing.id)
          if (error) throw error
          return { action: 'switched', type }
        }
      } else {
        // New reaction
        const { error } = await supabase
          .from('reactions')
          .insert({ project_id: projectId, user_id: userId, reaction_type: type })
        if (error) throw error
        return { action: 'added', type }
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['project', projectId] })
      queryClient.invalidateQueries({ queryKey: ['projects'] })
    }
  })

  return { toggleReaction }
}
