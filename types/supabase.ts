export type Database = {
  public: {
    Tables: {
      leads: {
        Row: { id: number; name: string; email: string }
        Insert: { name: string; email: string }
        Update: { name?: string; email?: string }
      }
    }
    Views: {}
    Functions: {}
  }
}
