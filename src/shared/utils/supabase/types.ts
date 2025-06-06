export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      favorites: {
        Row: {
          id: number
          restaurant_id: number | null
          user_id: string | null
        }
        Insert: {
          id?: number
          restaurant_id?: number | null
          user_id?: string | null
        }
        Update: {
          id?: number
          restaurant_id?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "favorites_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "restaurant"
            referencedColumns: ["id"]
          },
        ]
      }
      profile: {
        Row: {
          id: string
          name: string | null
          phone: string | null
          updated_at: string | null
        }
        Insert: {
          id: string
          name?: string | null
          phone?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          name?: string | null
          phone?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      raffle: {
        Row: {
          available_seats: number | null
          end_datetime: string | null
          id: number
          restaurant_id: number | null
          start_datetime: string | null
        }
        Insert: {
          available_seats?: number | null
          end_datetime?: string | null
          id?: number
          restaurant_id?: number | null
          start_datetime?: string | null
        }
        Update: {
          available_seats?: number | null
          end_datetime?: string | null
          id?: number
          restaurant_id?: number | null
          start_datetime?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "raffle_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "restaurant"
            referencedColumns: ["id"]
          },
        ]
      }
      raffle_participant: {
        Row: {
          entry_datetime: string | null
          id: number
          is_winner: boolean | null
          notification_sent: boolean | null
          raffle_id: number | null
          user_id: string | null
        }
        Insert: {
          entry_datetime?: string | null
          id?: number
          is_winner?: boolean | null
          notification_sent?: boolean | null
          raffle_id?: number | null
          user_id?: string | null
        }
        Update: {
          entry_datetime?: string | null
          id?: number
          is_winner?: boolean | null
          notification_sent?: boolean | null
          raffle_id?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "raffle_participant_raffle_id_fkey"
            columns: ["raffle_id"]
            isOneToOne: false
            referencedRelation: "raffle"
            referencedColumns: ["id"]
          },
        ]
      }
      restaurant: {
        Row: {
          address: string | null
          closing_hours: string | null
          cuisine_type: string | null
          description: string | null
          id: number
          max_capacity: number | null
          name: string | null
          opening_hours: string | null
        }
        Insert: {
          address?: string | null
          closing_hours?: string | null
          cuisine_type?: string | null
          description?: string | null
          id?: number
          max_capacity?: number | null
          name?: string | null
          opening_hours?: string | null
        }
        Update: {
          address?: string | null
          closing_hours?: string | null
          cuisine_type?: string | null
          description?: string | null
          id?: number
          max_capacity?: number | null
          name?: string | null
          opening_hours?: string | null
        }
        Relationships: []
      }
      restaurant_image: {
        Row: {
          id: number
          image_description: string | null
          image_url: string | null
          is_primary: boolean | null
          restaurant_id: number | null
        }
        Insert: {
          id?: number
          image_description?: string | null
          image_url?: string | null
          is_primary?: boolean | null
          restaurant_id?: number | null
        }
        Update: {
          id?: number
          image_description?: string | null
          image_url?: string | null
          is_primary?: boolean | null
          restaurant_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "restaurant_image_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "restaurant"
            referencedColumns: ["id"]
          },
        ]
      }
      reviews: {
        Row: {
          comment: string | null
          id: number
          rating: number | null
          restaurant_id: number | null
          review_date: string | null
          user_id: string | null
        }
        Insert: {
          comment?: string | null
          id?: number
          rating?: number | null
          restaurant_id?: number | null
          review_date?: string | null
          user_id?: string | null
        }
        Update: {
          comment?: string | null
          id?: number
          rating?: number | null
          restaurant_id?: number | null
          review_date?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "reviews_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "restaurant"
            referencedColumns: ["id"]
          },
        ]
      }
      reviews_image: {
        Row: {
          id: number
          id2: number | null
          image_url: string | null
          reviews_id: number | null
        }
        Insert: {
          id?: number
          id2?: number | null
          image_url?: string | null
          reviews_id?: number | null
        }
        Update: {
          id?: number
          id2?: number | null
          image_url?: string | null
          reviews_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "reviews_image_reviews_id_fkey"
            columns: ["reviews_id"]
            isOneToOne: false
            referencedRelation: "reviews"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      enter_raffle: {
        Args: { p_user_id: string; p_raffle_id: number }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {},
  },
} as const
