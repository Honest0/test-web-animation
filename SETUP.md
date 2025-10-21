# Setup Instructions

## 1. Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here
```

## 2. Supabase Setup

1. Go to [supabase.com](https://supabase.com) and create a new project
2. In your Supabase dashboard, go to the SQL Editor
3. Run the SQL from `supabase-schema.sql` to create the required table
4. Go to Settings > API to get your project URL and keys
5. Copy the values to your `.env.local` file

## 3. Run the Application

```bash
npm run dev
```

The application will be available at http://localhost:3000

## 4. Test the Email Submission

1. Open the application in your browser
2. Enter a valid email address
3. Click "Join Our Pack! 🐾"
4. You should see a success message
5. Check your Supabase database to verify the email was saved



