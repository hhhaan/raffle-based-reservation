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
          status: string | null
        }
        Insert: {
          available_seats?: number | null
          end_datetime?: string | null
          id?: number
          restaurant_id?: number | null
          start_datetime?: string | null
          status?: string | null
        }
        Update: {
          available_seats?: number | null
          end_datetime?: string | null
          id?: number
          restaurant_id?: number | null
          start_datetime?: string | null
          status?: string | null
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
          id2: number | null
          image_description: string | null
          image_url: string | null
          is_primary: boolean | null
          restaurant_id: number | null
        }
        Insert: {
          id?: number
          id2?: number | null
          image_description?: string | null
          image_url?: string | null
          is_primary?: boolean | null
          restaurant_id?: number | null
        }
        Update: {
          id?: number
          id2?: number | null
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
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
