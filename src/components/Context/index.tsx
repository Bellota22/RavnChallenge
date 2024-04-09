import React, { createContext, useState, useContext, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_ALL_TASKS } from '@/api/tasks';
import { GET_ALL_USERS } from '@/api/users';

interface AppContextType {
  dashboard: boolean;
  setDashboard: React.Dispatch<React.SetStateAction<boolean>>;
  taskList: boolean;
  setTaskList: React.Dispatch<React.SetStateAction<boolean>>;
  dashboardOnHover: boolean;
  setDashboardOnHover: React.Dispatch<React.SetStateAction<boolean>>;
  taskListOnHover: boolean;
  setTaskListOnHover: React.Dispatch<React.SetStateAction<boolean>>;
  openCreateTask: boolean;
  setOpenCreateTask: React.Dispatch<React.SetStateAction<boolean>>;
  slowTransitionOpened: boolean;
  setSlowTransitionOpened: React.Dispatch<React.SetStateAction<boolean>>;
  taskTitle: string;
  setTaskTitle: React.Dispatch<React.SetStateAction<string>>;
  newTask: any;
  setNewTask: React.Dispatch<React.SetStateAction<any>>;
  deleteTask: any;
  setDeleteTask: React.Dispatch<React.SetStateAction<any>>;
  loadingTasks: boolean;
  loadingUsers: boolean;
  errorTasks: any;
  errorUsers: any;
  dataTasks: any;
  dataUsers: any;
}

const AppContext = createContext<AppContextType>({
  dashboard: false,
  setDashboard: () => {},
  taskList: false,
  setTaskList: () => {},
  dashboardOnHover: false,
  setDashboardOnHover: () => {},
  taskListOnHover: false,
  setTaskListOnHover: () => {},
  openCreateTask: false,
  setOpenCreateTask: () => {},
  slowTransitionOpened: false,
  setSlowTransitionOpened: () => {},
  taskTitle: '',
  setTaskTitle: () => {},
  newTask: {},
  setNewTask: () => {},
  deleteTask: undefined,
  setDeleteTask: () => {},

  loadingTasks: false,
  loadingUsers: false,
  errorTasks: undefined,
  errorUsers: undefined,
  dataTasks: undefined,
  dataUsers: undefined,

});
export function AppContextProvider({ children }: { children: React.ReactNode }) {
  const [dashboard, setDashboard] = useState(true);
  const [taskList, setTaskList] = useState(false);
  const [dashboardOnHover, setDashboardOnHover] = useState(false);
  const [taskListOnHover, setTaskListOnHover] = useState(false);
  const [slowTransitionOpened, setSlowTransitionOpened] = useState(false);
  const [taskTitle, setTaskTitle] = useState('');
  const [newTask, setNewTask] = useState({});
  const [deleteTask, setDeleteTask] = useState(false);

  const [openCreateTask, setOpenCreateTask] = useState(false);
  const setDashboardExclusive = (value: boolean) => {
    if (!value && dashboard) return;
    if (value) {
      setTaskList(false);
    }
    setDashboard(value);
  };

  const setTaskListExclusive = (value: boolean) => {
    if (!value && taskList) return;
    if (value) {
      setDashboard(false);
    }
    setTaskList(value);
  };
  const { refetch: refetchTasks } = useQuery(GET_ALL_TASKS);
  useEffect(() => {
    if (Object.keys(newTask).length > 0 || deleteTask) {
      refetchTasks();
      setDeleteTask(false);
    }
  }, [newTask, deleteTask, refetchTasks]);

  const { loading: loadingTasks, error: errorTasks, data: dataTasks } = useQuery(GET_ALL_TASKS);
  const { loading: loadingUsers, error: errorUsers, data: dataUsers } = useQuery(GET_ALL_USERS);
  return (
    <AppContext.Provider value={{
      dashboard,
      setDashboard: setDashboardExclusive as React.Dispatch<React.SetStateAction<boolean>>,
      taskList,
      setTaskList: setTaskListExclusive as React.Dispatch<React.SetStateAction<boolean>>,
      dashboardOnHover,
      setDashboardOnHover,
      taskListOnHover,
      setTaskListOnHover,
      openCreateTask,
      setOpenCreateTask,
      slowTransitionOpened,
      setSlowTransitionOpened,
      taskTitle,
      setTaskTitle,
      loadingTasks,
      errorTasks,
      dataTasks,
      loadingUsers,
      errorUsers,
      dataUsers,
      newTask,
      setNewTask,
      setDeleteTask,
      deleteTask,
     }}>
      {children}
    </AppContext.Provider>
  );
}
export function useAppContext() {
  return useContext(AppContext);
}
