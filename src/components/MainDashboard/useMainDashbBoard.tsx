import { useAppContext } from '../Context';

export const useMainDashBoard = () => {
  const { loadingTasks, errorTasks, dataTasks } = useAppContext();

    const tasksByStatus: { [key: string]: any[] } = {
      BACKLOG: [],
      CANCELLED: [],
      DONE: [],
      IN_PROGRESS: [],
      TODO: [],
    };

    dataTasks?.tasks.forEach((task: any) => {
      tasksByStatus[task?.status].push(task);
    });
    const dataDisplay = Object.entries(tasksByStatus).map(([status, tasks]) => ({
      status,
      tasks,
    }));
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
