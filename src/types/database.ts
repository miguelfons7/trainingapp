/**
 * Supabase Database Types
 * These map to the tables defined in supabase/migrations/001_initial_schema.sql
 *
 * Note: Supabase JS v2 requires Tables to include a Relationships array
 * and the schema to include Views for proper type inference.
 */

export type UserRole = 'user' | 'leadership' | 'admin'
export type ModuleStatus = 'not-started' | 'in-progress' | 'completed'
export type RequestStatus = 'pending' | 'in-review' | 'approved' | 'rejected' | 'completed'

export interface Database {
  public: {
    Tables: {
      teams: {
        Row: {
          id: string
          name: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          created_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string
          role: UserRole
          team_id: string | null
          avatar_url: string | null
          invited_by: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name: string
          role?: UserRole
          team_id?: string | null
          avatar_url?: string | null
          invited_by?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string
          role?: UserRole
          team_id?: string | null
          avatar_url?: string | null
          invited_by?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'profiles_team_id_fkey'
            columns: ['team_id']
            isOneToOne: false
            referencedRelation: 'teams'
            referencedColumns: ['id']
          },
        ]
      }
      course_assignments: {
        Row: {
          id: string
          user_id: string
          course_id: string
          assigned_by: string | null
          assigned_at: string
          due_date: string | null
        }
        Insert: {
          id?: string
          user_id: string
          course_id: string
          assigned_by?: string | null
          assigned_at?: string
          due_date?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          course_id?: string
          assigned_by?: string | null
          assigned_at?: string
          due_date?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'course_assignments_user_id_fkey'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'course_assignments_assigned_by_fkey'
            columns: ['assigned_by']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
        ]
      }
      module_progress: {
        Row: {
          id: string
          user_id: string
          course_id: string
          module_id: string
          status: ModuleStatus
          score: number | null
          started_at: string | null
          completed_at: string | null
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          course_id: string
          module_id: string
          status?: ModuleStatus
          score?: number | null
          started_at?: string | null
          completed_at?: string | null
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          course_id?: string
          module_id?: string
          status?: ModuleStatus
          score?: number | null
          started_at?: string | null
          completed_at?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'module_progress_user_id_fkey'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
        ]
      }
      invitations: {
        Row: {
          id: string
          email: string
          role: UserRole
          team_id: string | null
          invited_by: string
          token: string
          accepted_at: string | null
          expires_at: string
          created_at: string
        }
        Insert: {
          id?: string
          email: string
          role?: UserRole
          team_id?: string | null
          invited_by: string
          token?: string
          accepted_at?: string | null
          expires_at?: string
          created_at?: string
        }
        Update: {
          id?: string
          email?: string
          role?: UserRole
          team_id?: string | null
          invited_by?: string
          token?: string
          accepted_at?: string | null
          expires_at?: string
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'invitations_team_id_fkey'
            columns: ['team_id']
            isOneToOne: false
            referencedRelation: 'teams'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'invitations_invited_by_fkey'
            columns: ['invited_by']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
        ]
      }
      compliance_items: {
        Row: {
          id: string
          title: string
          description: string
          details: string
          required_by: string
          priority: string
          created_by: string | null
          is_seed: boolean
          created_at: string
          status: string
          scheduled_at: string | null
          departments: string[]
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          id: string
          title: string
          description: string
          details: string
          required_by: string
          priority?: string
          created_by?: string | null
          is_seed?: boolean
          created_at?: string
          status?: string
          scheduled_at?: string | null
          departments?: string[]
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          id?: string
          title?: string
          description?: string
          details?: string
          required_by?: string
          priority?: string
          created_by?: string | null
          is_seed?: boolean
          created_at?: string
          status?: string
          scheduled_at?: string | null
          departments?: string[]
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: []
      }
      compliance_acknowledgements: {
        Row: {
          id: string
          item_id: string
          user_id: string
          acknowledged_at: string
        }
        Insert: {
          id?: string
          item_id: string
          user_id: string
          acknowledged_at?: string
        }
        Update: {
          id?: string
          item_id?: string
          user_id?: string
          acknowledged_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'compliance_acknowledgements_item_id_fkey'
            columns: ['item_id']
            isOneToOne: false
            referencedRelation: 'compliance_items'
            referencedColumns: ['id']
          },
        ]
      }
      audit_log: {
        Row: {
          id: string
          actor_id: string
          action: string
          entity_type: string
          entity_id: string
          entity_title: string | null
          details: Record<string, unknown>
          created_at: string
        }
        Insert: {
          id?: string
          actor_id: string
          action: string
          entity_type: string
          entity_id: string
          entity_title?: string | null
          details?: Record<string, unknown>
          created_at?: string
        }
        Update: {
          id?: string
          actor_id?: string
          action?: string
          entity_type?: string
          entity_id?: string
          entity_title?: string | null
          details?: Record<string, unknown>
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'audit_log_actor_id_fkey'
            columns: ['actor_id']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
        ]
      }
      content_requests: {
        Row: {
          id: string
          requested_by: string
          title: string
          description: string
          course_id: string | null
          status: RequestStatus
          reviewed_by: string | null
          review_note: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          requested_by: string
          title: string
          description: string
          course_id?: string | null
          status?: RequestStatus
          reviewed_by?: string | null
          review_note?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          requested_by?: string
          title?: string
          description?: string
          course_id?: string | null
          status?: RequestStatus
          reviewed_by?: string | null
          review_note?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'content_requests_requested_by_fkey'
            columns: ['requested_by']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'content_requests_reviewed_by_fkey'
            columns: ['reviewed_by']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
        ]
      }
    }
    Views: Record<string, never>
    Functions: {
      get_my_role: {
        Args: Record<string, never>
        Returns: string
      }
      get_my_team_id: {
        Args: Record<string, never>
        Returns: string
      }
      is_admin: {
        Args: Record<string, never>
        Returns: boolean
      }
      is_leadership_or_admin: {
        Args: Record<string, never>
        Returns: boolean
      }
      validate_invitation_token: {
        Args: { invite_token: string }
        Returns: {
          email: string
          role: string
          team_name: string | null
          status: string
        }[]
      }
    }
  }
}

/** Convenience aliases */
export type Profile = Database['public']['Tables']['profiles']['Row']
export type Team = Database['public']['Tables']['teams']['Row']
export type CourseAssignment = Database['public']['Tables']['course_assignments']['Row']
export type ModuleProgressRow = Database['public']['Tables']['module_progress']['Row']
export type Invitation = Database['public']['Tables']['invitations']['Row']
export type ContentRequest = Database['public']['Tables']['content_requests']['Row']
export type ComplianceItemRow = Database['public']['Tables']['compliance_items']['Row']
export type ComplianceAcknowledgementRow = Database['public']['Tables']['compliance_acknowledgements']['Row']
export type AuditLogRow = Database['public']['Tables']['audit_log']['Row']
