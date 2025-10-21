import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { EmailSubmission, ApiResponse } from '@/lib/types'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email } = body

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email || !emailRegex.test(email)) {
      const response: ApiResponse = {
        success: false,
        message: 'Please provide a valid email address'
      }
      return NextResponse.json(response, { status: 400 })
    }

    // Check if email already exists
    const { data: existingEmail } = await supabaseAdmin
      .from('email_submissions')
      .select('id')
      .eq('email', email)
      .single()

    if (existingEmail) {
      const response: ApiResponse = {
        success: false,
        message: 'This email is already registered'
      }
      return NextResponse.json(response, { status: 409 })
    }

    // Insert new email
    const { data, error } = await supabaseAdmin
      .from('email_submissions')
      .insert([
        {
          email: email.toLowerCase().trim(),
          status: 'pending'
        }
      ])
      .select()

    if (error) {
      console.error('Supabase error:', error)
      const response: ApiResponse = {
        success: false,
        message: 'Failed to save email. Please try again.'
      }
      return NextResponse.json(response, { status: 500 })
    }

    const response: ApiResponse = {
      success: true,
      message: 'Email successfully registered!',
      data: data[0]
    }

    return NextResponse.json(response, { status: 201 })

  } catch (error) {
    console.error('API error:', error)
    const response: ApiResponse = {
      success: false,
      message: 'An unexpected error occurred. Please try again.'
    }
    return NextResponse.json(response, { status: 500 })
  }
}



