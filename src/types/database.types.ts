export type Database = {
  public: {
    Tables: {
      items: {
        Row: {
          id: string
          created_at: string
          name: string
          category: string
          completed: boolean
          user_id: string
        }
        Insert: {
          name: string
          category: string
          completed?: boolean
          user_id: string
        }
        Update: {
          name?: string
          category?: string
          completed?: boolean
          user_id?: string
        }
      }
    }
  }
} 