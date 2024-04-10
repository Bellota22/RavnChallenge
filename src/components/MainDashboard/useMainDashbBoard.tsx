import { useEffect, useState } from 'react';
import { useAppContext } from '../Context';

export const useMainDashBoard = () => {
  const {
    loadingTasks,
    errorTasks,
    dataTasks,
    filteredTasks,
    newTask,
    deleteTask,
    isEditing,
  } = useAppContext();
  const [dataDisplay, setDataDisplay] = useState<any[]>([]);
  const tasksByStatus: { [key: string]: any[] } = {
    BACKLOG: [],
    CANCELLED: [],
    DONE: [],
    IN_PROGRESS: [],
    TODO: [],
  };

    useEffect(() => {
      if (filteredTasks.length > 0) {
        filteredTasks.forEach((task: any) => {
          tasksByStatus[task?.status].push(task);
        });
      } else {
        dataTasks?.tasks.forEach((task: any) => {
          tasksByStatus[task?.status].push(task);
        });
      }
      const data = Object.entries(tasksByStatus).map(([status, tasks]) => ({
        status,
        tasks,
      }));
      setDataDisplay(data);
    }, [filteredTasks, loadingTasks, dataTasks, newTask, deleteTask, isEditing]);
    const pointEstimatedHanlde = (pointEstimate: string) => {
      switch (pointEstimate) {
        case 'ZERO':
          return '0';
        case 'ONE':
          return '1';
        case 'TWO':
          return '2';
        case 'FOUR':
          return '4';
        case 'EIGHT':
          return '8';
        default:
          return '0';
      }
    };

  return {
    loadingTasks,
    errorTasks,
    dataDisplay,
    pointEstimatedHanlde,
  };
};
