
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://vairjyzbertlgzkrufhi.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZhaXJqeXpiZXJ0bGd6a3J1ZmhpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDczNjMzNDUsImV4cCI6MjA2MjkzOTM0NX0.XUaDa1nxs2xy7RMrr0oB9hU-3PMjrtmHy_eHuQeOvnM';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
