import { useMutation } from '@apollo/client';
import { notifications } from '@mantine/notifications';
import { useAppContext } from '../Context';
import classes from './CardDashboard.module.css';
import { DELETE_TASK } from '@/api/tasks';

export const useCardDashboard = (dueDate: string, id: any) => {
  const { setDeleteTask, deleteTask } = useAppContext();

  function formatDate(date: Date) {
    const day = date.getDate();
    const month = date.toLocaleString('en-US', { month: 'long' });
    const year = date.getFullYear();
    return `${day} ${month}, ${year}`;
  }

    const currentDate = new Date();
    const taskDueDate = new Date(dueDate);
    const timeDifference = taskDueDate.getTime() - currentDate.getTime();
    const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));
    let badgeColor = classes.tagNeutral;
    let badgeText = formatDate(taskDueDate);
    if (daysDifference < 0) {
      badgeColor = classes.tagPrimary;
    } else if (daysDifference < -2) {
      badgeText = 'Overdue';
    } else if (daysDifference < -1) {
      badgeText = 'Yesterday';
    } else if (daysDifference <= 2) {
      badgeColor = classes.tagTertiary;
    }

  const handleTagColor = (tag: string) => {
    switch (tag) {
      case 'IOS':
        return classes.tagPrimary;
      case 'ANDROID':
        return classes.tagSecondary;
      case 'NODE_JS':
        return classes.tagTertiary;
      case 'RAILS':
        return classes.tagNeutral;
      case 'REACT':
        return classes.tagQuaternary;
      default:
        return classes.tagNeutral;
    }
  };

  const [
    deleteTaskMutation,
    { loading: deleteTaskLoading, error: deleteTaskError },
   ] = useMutation(DELETE_TASK);

  const handleDeleteTask = async () => {
    const res = await deleteTaskMutation({
      variables: {
        input: {
          id,
        },
      },
    });

    if (res.data.deleteTask.id) {
        notifications.show({
        title: 'Task deleted',
        message: 'The task was deleted successfully',
        color: 'green',
      });
      setDeleteTask(res.data.deleteTask.id);
    } else {
      notifications.show({
        title: 'Error',
        message: 'There was an error deleting the task',
        color: 'red',
      });
    }
  };
  return {
    handleTagColor,
    badgeColor,
    badgeText,
    daysDifference,
    deleteTask,
    setDeleteTask,
    handleDeleteTask,
  };
};
