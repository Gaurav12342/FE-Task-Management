/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ICreateTask {
  title: string;
  description: string;
  dueDate: string;
  priority: string;
}

export interface ICreateTaskInitialState {
  loading: boolean;
  taskData: any;
  error: string;
}

export interface IUpdateTask {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: string;
}
