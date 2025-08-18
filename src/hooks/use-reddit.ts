import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { redditApi, RedditIntegration, CaptureJob } from '@/lib/api/reddit'

// Simple toast replacement using browser alerts for now
const toast = {
  success: (message: string) => {
    console.log('✅ Success:', message)
    // You can replace this with a proper toast library later
  },
  error: (message: string) => {
    console.error('❌ Error:', message)
    alert(message) // Temporary fallback
  }
}

export const useRedditIntegration = () => {
  return useQuery({
    queryKey: ['reddit-integration'],
    queryFn: redditApi.getIntegration,
  })
}

export const useRedditAuthUrl = () => {
  return useQuery({
    queryKey: ['reddit-auth-url'],
    queryFn: redditApi.getAuthUrl,
    enabled: false, // Only fetch when explicitly called
  })
}

export const useRedditAuth = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ code, state }: { code: string; state: string }) =>
      redditApi.handleCallback(code, state),
    onSuccess: (integration: RedditIntegration) => {
      queryClient.setQueryData(['reddit-integration'], integration)
      toast.success('Reddit account connected successfully!')
    },
    onError: (error: any) => {
      toast.error('Failed to connect Reddit account: ' + error.message)
    },
  })
}

export const useDeleteRedditIntegration = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: redditApi.deleteIntegration,
    onSuccess: () => {
      queryClient.setQueryData(['reddit-integration'], null)
      toast.success('Reddit account disconnected')
    },
    onError: (error: any) => {
      toast.error('Failed to disconnect Reddit account: ' + error.message)
    },
  })
}

export const useRedditCapture = () => {
  return useMutation({
    mutationFn: redditApi.startCapture,
    onSuccess: (job: CaptureJob) => {
      if (job.status === 'COMPLETED') {
        toast.success(
          `Capture completed! Created ${job.progress.createdTasks} tasks, skipped ${job.progress.duplicatesSkipped} duplicates`
        )
      } else if (job.status === 'FAILED') {
        toast.error(`Capture failed: ${job.errorMessage}`)
      }
    },
    onError: (error: any) => {
      toast.error('Failed to start Reddit capture: ' + error.message)
    },
  })
}