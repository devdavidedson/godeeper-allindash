import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://leiyqgtelxjeivyjlppx.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxlaXlxZ3RlbHhqZWl2eWpscHB4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MjYxNDcxNCwiZXhwIjoyMDY4MTkwNzE0fQ.UeduOkXBhVLv2ZHEu-Il56X2LhSGMGLUNJDHDX-5IrQ';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
