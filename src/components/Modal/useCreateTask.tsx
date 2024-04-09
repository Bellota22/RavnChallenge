import { useEffect, useState } from 'react';
import { notifications } from '@mantine/notifications';
import { useMutation } from '@apollo/client';
import { useAppContext } from '../Context';
import { MenuData } from './ModalActionable';
import tagIcon from '../../public/tagIcon.svg';
import estimateIcon from '../../public/estimateIcon.svg';
import assigneeIcon from '../../public/assigneeIcon.svg';
import checkboxWhite from '../../public/checkboxWhite.svg';
import { CREATE_TASK } from '@/api/tasks';

export const useCreateTask = () => {
  const {
    loadingTasks,
    errorTasks,
    dataTasks,
    loadingUsers,
    errorUsers,
    dataUsers,
    slowTransitionOpened,
    setSlowTransitionOpened,
    taskTitle,
    setTaskTitle,
    setNewTask,
  } = useAppContext();
  const [actionablesData, setActionablesData] = useState<MenuData[]>([]);
  const [dateValue, setDateValue] = useState<Date | null>(null);
  const [selectedEstimate, setSelectedEstimate] = useState<string | null>(null);
  const [selectedAssignee, setSelectedAssignee] = useState<string | null>(null);
  const [selectedLabel, setSelectedLabel] = useState<string | null>(null);

  useEffect(() => {
    if (!loadingTasks && !errorTasks && dataUsers) {
      const itemsFormatted = dataUsers?.users?.map((users: any) => ({
        name: users?.fullName,
        icon: users?.avatar || '',
      }));
      setActionablesData([
        {
          icon: estimateIcon,
          label: 'Estimate',
          items: [
            { name: '0 Points', icon: estimateIcon },
            { name: '1 Points', icon: estimateIcon },
            { name: '2 Points', icon: estimateIcon },
            { name: '4 Points', icon: estimateIcon },
            { name: '8 Points', icon: estimateIcon },
          ],
        },
        {
          icon: assigneeIcon,
          label: 'Assign To...',
          items: itemsFormatted,
        },
        {
          icon: tagIcon,
          label: 'Label',
          items: [
            { name: 'IOS', icon: checkboxWhite },
            { name: 'ANDROID', icon: checkboxWhite },
            { name: 'NODE_JS', icon: checkboxWhite },
            { name: 'RAILS', icon: checkboxWhite },
            { name: 'REACT', icon: checkboxWhite },
          ],
        },
      ]);
    }
  }, [slowTransitionOpened, dataTasks, loadingTasks, errorTasks]);
  const handelPointEstimate = (name: string) => {
    switch (name) {
      case '0 Points':
        return 'ZERO';
      case '1 Points':
        return 'ONE';
      case '2 Points':
        return 'TWO';
      case '4 Points':
        return 'FOUR';
      case '8 Points':
        return 'EIGHT';
      default:
        return 'ZERO';
    }
  };
  const [
    createTaskMutation,
    { loading: createTaskLoading, error: createTaskError },
   ] = useMutation(CREATE_TASK);

  const handleCreateTask = async () => {
    if (!taskTitle) {
      notifications.show({
        title: 'Task title is required',
        message: 'Please provide task title',
        color: 'red',
      });
      return;
    }
    if (!selectedEstimate) {
      notifications.show({
        title: 'Estimate is required',
        message: 'Please provide task estimate',
        color: 'red',
      });
      return;
    }
    if (!selectedLabel) {
      notifications.show({
        title: 'Label is required',
        message: 'Please provide task label',
        color: 'red',
      });
      return;
    }
    if (!dateValue) {
      notifications.show({
        title: 'Due date is required',
        message: 'Please provide task due date',
        color: 'red',
      });
      return;
    }
    try {
      const res = await createTaskMutation({
        variables: {
          input: {
            dueDate: dateValue?.toISOString(),
            name: taskTitle,
            assigneeId: selectedAssignee,
            pointEstimate: handelPointEstimate(selectedEstimate!),
            status: 'TODO',
            tags: selectedLabel,
          },
        },
      });
      setNewTask(res.data.createTask);
      setSelectedAssignee('');
      setSelectedEstimate('');
      setSelectedLabel('');
      setDateValue(null);
      setTaskTitle('');
      setSlowTransitionOpened(false);
      notifications.show({
        title: 'Task created',
        message: 'Task has been created successfully',
        color: 'green',
      });
    } catch (error) {
      notifications.show({
        title: 'Error creating task',
        message: 'An error occurred while creating task',
        color: 'red',
      });
      console.error('Error creating task:', error);
    }
  };
  return {
    loadingTasks,
    errorTasks,
    dataTasks,
    loadingUsers,
    errorUsers,
    dataUsers,
    actionablesData,
    selectedEstimate,
    setSelectedEstimate,
    selectedAssignee,
    setSelectedAssignee,
    selectedLabel,
    setSelectedLabel,
    dateValue,
    setDateValue,
    taskTitle,
    setTaskTitle,
    slowTransitionOpened,
    setSlowTransitionOpened,
    setNewTask,
    handleCreateTask,
  };
};
