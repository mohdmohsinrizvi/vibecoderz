import { useQuery, useMutation } from '@tanstack/react-query'
import { supabase } from '../lib/supabase'

export function useLeaderboard() {
  return useQuery({
    queryKey: ['leaderboard'],
    queryFn: async () => {
      const { data, error } = await supabase.rpc('get_leaderboard')
      if (error) throw error
      return data
    },
    staleTime: 60 * 1000
  })
}

export function useProfile(username) {
  return useQuery({
    queryKey: ['profile', username],
    queryFn: async () => {
      let queryUsername = username
      let userId = null

      if (username === 'me') {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) throw new Error('Not authenticated')
        userId = user.id
      }

      let query = supabase
        .from('users')
        .select(`
          id, username, display_name, bio, avatar_url, created_at,
          projects(id, title, url, description, created_at, reactions(reaction_type))
        `)

      if (userId) {
        query = query.eq('id', userId)
      } else {
        query = query.eq('username', queryUsername)
      }

      const { data, error } = await query.single()
      if (error) throw error
      return data
    },
    enabled: !!username
  })
}

export function useUpdateProfile() {
  return useMutation({
    mutationFn: async ({ userId, display_name, bio }) => {
      const { error } = await supabase
        .from('users')
        .update({ display_name, bio })
        .eq('id', userId)

      if (error) throw error
    }
  })
}
