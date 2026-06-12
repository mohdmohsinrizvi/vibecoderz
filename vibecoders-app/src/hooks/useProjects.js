import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '../lib/supabase'

export function useProjects(page = 0, limit = 20) {
  return useQuery({
    queryKey: ['projects', page],
    queryFn: async () => {
      const start = page * limit
      const end = start + limit - 1

      const { data, error } = await supabase
        .from('projects')
        .select(`
          id, title, url, description, created_at,
          user:users(id, username, display_name, avatar_url),
          reactions(reaction_type),
          comments(id)
        `)
        .order('created_at', { ascending: false })
        .range(start, end)

      if (error) throw error
      return data
    },
    staleTime: 60 * 1000
  })
}

export function useProject(id) {
  return useQuery({
    queryKey: ['project', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('projects')
        .select(`
          id, title, url, description, created_at, updated_at,
          user:users(id, username, display_name, avatar_url),
          reactions(id, user_id, reaction_type),
          comments(
            id, content, created_at,
            user:users(id, username, display_name, avatar_url)
          )
        `)
        .eq('id', id)
        .single()

      if (error) throw error
      return data
    },
    enabled: !!id
  })
}

export function useCreateProject() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ title, url, description, userId }) => {
      const { data, error } = await supabase
        .from('projects')
        .insert({ title, url, description, user_id: userId })
        .select()
        .single()

      if (error) throw error
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] })
    }
  })
}

export function useUpdateProject() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ id, title, url, description }) => {
      const { data, error } = await supabase
        .from('projects')
        .update({ title, url, description })
        .eq('id', id)
        .select()
        .single()

      if (error) throw error
      return data
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['projects'] })
      queryClient.invalidateQueries({ queryKey: ['project', variables.id] })
    }
  })
}

export function useDeleteProject() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id) => {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id)

      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] })
    }
  })
}
