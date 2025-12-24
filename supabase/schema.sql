-- Create a table to store User Analysis Results
create table if not exists user_results (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  
  -- User Identification (Optional, allows anonymous results)
  email text,
  username text, -- 'name' from the test flow
  
  -- Paima/Profile Analysis Result
  profile_key text not null, -- e.g., 'DORMANT_RULER'
  profile_name text,       -- e.g., '야망을 숨긴 통치자'
  
  -- Test Scores (Stored as JSONB for flexibility)
  -- Structure: { "a": 5, "b": 3, ... }
  explicit_scores jsonb, 
  implicit_scores jsonb,
  
  -- Calculated Metrics (Optional, for easier querying/analytics)
  explicit_total_score numeric,
  implicit_total_score numeric,
  
  -- Payment/Status Metadata
  is_paid boolean default false,
  payment_method text,
  
  -- Gemini Analysis Content (Cache the generated result)
  ai_analysis_summary text, -- The JSON or Text output from Gemini
  
  -- Metadata
  metadata jsonb default '{}'::jsonb
);

-- Basic Policies (RLS) - Adjust based on auth needs
alter table user_results enable row level security;

-- Allow public inserts (for anonymous test takers) - BE CAREFUL IN PRODUCTION
create policy "Allow public inserts" on user_results for insert with check (true);
