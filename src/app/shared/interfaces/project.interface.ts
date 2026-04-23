export interface IUser {
  id: number;
  firstname: string;
  lastname: string;
  email?: string;
  avatar?: string;
  role?: string;
  project_team?: {
    role: string;
  };
}

export interface ITaskAttachment {
  id: number;
  task_id: number;
  name: string;
  url: string;
  size: string;
  mimetype: string;
  createdAt?: string;
}

export interface ITaskComment {
  id: number;
  task_id: number;
  user_id: number;
  content: string;
  user?: IUser;
  createdAt: string;
}

export interface ITaskActivity {
  id: number;
  task_id: number;
  user_id: number;
  action_type: string;
  detail: string;
  user?: IUser;
  createdAt: string;
}

export interface IProjectTask {
  id: string | number;
  project_id: string | number;
  parent_id?: string | number | null;
  title: string;
  description?: string;
  priority: 'High Priority' | 'Medium Priority' | 'Low Priority';
  status: 'To Do' | 'In Progress' | 'Review' | 'Completed';
  progress?: number;
  is_completed?: boolean;
  due_date?: string;
  assignees?: IUser[];
  attachments?: ITaskAttachment[];
  comments?: ITaskComment[];
  activities?: ITaskActivity[];
  subtasks?: IProjectTask[];
  createdAt?: string;

  // UI helper fields
  priorityClass?: string;
}

export interface IMilestone {
  id?: number;
  name: string;
  phase?: string;
  is_completed: boolean;
  progress: number;
  color: string;
  createdAt?: string;
}

export interface IProjectDocument {
  id: number;
  project_id?: number;
  name: string;
  url: string;
  size: string;
  mimetype: string;
  createdAt: string;
}

export interface IAuditEntry {
  id: string;
  type: string;
  action: string;
  detail: string;
  user: string;
  time: string;
  icon: string;
  color: string;
}

export interface IProject {
  id: string | number;
  name: string;
  type?: string;
  address?: string;
  description?: string;
  company_id: number;
  status: string;
  progress?: number;
  start_date?: string;
  end_date?: string;
  completion_date?: string;
  completionDate?: string; // Wizard field
  estimatedCompletion?: string; // Mapped field
  budget?: string;
  budget_total?: number;
  budget_used?: number;
  budget_summary?: { total: number; used: number }; // Mapped field
  team_members?: IUser[];
  team?: { name: string; role: string; avatar: string }[]; // Mapped field
  milestones?: IMilestone[];
  tasks?: IProjectTask[];
  documents?: IProjectDocument[];
  thumbnail?: string;
  createdAt?: string;
}

export interface ITimelineItem {
  id: string;
  name: string;
  color: string;
  completion?: number;
  width?: string;
  left: string;
  critical?: boolean;
  isMilestone?: boolean;
  milestoneTitle?: string;
  status?: string;
  assignee?: string;
}

export interface ITimelinePhase {
  title: string;
  tasks: ITimelineItem[];
}
