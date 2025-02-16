// @/config/supabase.js
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = 'https://kqndypikvfoahqakkpmm.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtxbmR5cGlrdmZvYWhxYWtrcG1tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzkzOTM2MjIsImV4cCI6MjA1NDk2OTYyMn0.uMBmDTF9qm-HCrFllIEkKXNjO-MNMfvkLubdR8WCkX4';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
