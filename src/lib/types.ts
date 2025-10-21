export interface EmailSubmission {
  id?: string
  email: string
  created_at?: string
  status?: 'pending' | 'confirmed' | 'unsubscribed'
}

export interface ApiResponse {
  success: boolean
  message: string
  data?: any
}



