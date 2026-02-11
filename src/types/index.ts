export interface FeatureSpec {
  goal: string;
  users: string;
  constraints: string;
  template?: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  type: 'story' | 'task' | 'risk';
  priority: 'high' | 'medium' | 'low';
  category: string;
  status: 'todo' | 'in-progress' | 'done';
}

export interface GeneratedSpec {
  id: string;
  spec: FeatureSpec;
  tasks: Task[];
  createdAt: string;
  title?: string;
}
