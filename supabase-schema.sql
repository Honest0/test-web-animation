-- Create the email_submissions table
CREATE TABLE IF NOT EXISTS email_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'unsubscribed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create an index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_email_submissions_email ON email_submissions(email);

-- Create an index on created_at for sorting
CREATE INDEX IF NOT EXISTS idx_email_submissions_created_at ON email_submissions(created_at);

-- Create a function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create a trigger to automatically update the updated_at column
CREATE TRIGGER update_email_submissions_updated_at 
    BEFORE UPDATE ON email_submissions 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE email_submissions ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows anyone to insert new emails
CREATE POLICY "Allow public email submissions" ON email_submissions
    FOR INSERT WITH CHECK (true);

-- Create a policy that allows reading emails (for admin purposes)
-- Note: In production, you might want to restrict this further
CREATE POLICY "Allow reading email submissions" ON email_submissions
    FOR SELECT USING (true);



