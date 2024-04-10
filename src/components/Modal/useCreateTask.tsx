import { useEffect, useState } from 'react';
import { notifications } from '@mantine/notifications';
import { useMutation } from '@apollo/client';
import { useAppContext } from '../Context';
import { MenuData } from './ModalActionable';
import tagIcon from '../../public/tagIcon.svg';
import estimateIcon from '../../public/estimateIcon.svg';
import assigneeIcon from '../../public/assigneeIcon.svg';
import checkboxWhite from '../../public/checkboxWhite.svg';
import statusIcon from '../../public/statusIcon.svg';
import { CREATE_TASK, EDIT_TASK } from '@/api/tasks';

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
    selectedEstimate,
    setSelectedEstimate,
    selectedAssignee,
    setSelectedAssignee,
    selectedLabel,
    setSelectedLabel,
    dateValue,
    setDateValue,
    isEditing,
    setIsEditing,
    selectedTaskId,
    clearModalStates,
    selectedStatus,
    setSelectedStatus,
  } = useAppContext();
  const [actionablesData, setActionablesData] = useState<MenuData[]>([]);
  const estimateLabel = selectedEstimate || 'Estimate';
  const assigneeLabel = selectedAssignee || 'Assign To...';
  const labelLabel = selectedLabel || 'Label';
  const statusLabel = selectedStatus || 'Status';
  useEffect(() => {
    if (!loadingTasks && !errorTasks && dataUsers) {
      const itemsFormatted = dataUsers?.users?.map((users: any) => ({
        id: users?.id,
        name: users?.fullName,
        icon: users?.avatar || '',
      }));
      setActionablesData([
        {
          icon: estimateIcon,
          label: estimateLabel,
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
          label: assigneeLabel,
          items: itemsFormatted,
        },
        {
          icon: statusIcon,
          label: statusLabel,
          items: [
            { name: 'BACKLOG', icon: checkboxWhite },
            { name: 'TODO', icon: checkboxWhite },
            { name: 'IN_PROGRESS', icon: checkboxWhite },
            { name: 'DONE', icon: checkboxWhite },
            { name: 'CANCELLED', icon: checkboxWhite },
          ],
        },
        {
          icon: tagIcon,
          label: labelLabel,
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

  const handleOnSelectItem = (menuData: MenuData, name: string) => {
    if (menuData.label === 'Estimate' || menuData.label === selectedEstimate) {
      setSelectedEstimate(selectedEstimate === name ? selectedEstimate : name);
    } else if (menuData.label === 'Assign To...' || menuData.label === selectedAssignee) {
      setSelectedAssignee(selectedAssignee === name ? '' : name);
    } else if (menuData.label === 'Status' || menuData.label === selectedStatus) {
      setSelectedStatus(selectedStatus === name ? '' : name);
    } else if (menuData.label === 'Label' || menuData.label === selectedLabel) {
      setSelectedLabel(selectedLabel === name ? '' : name);
    }
  };

  const [createTaskMutation] = useMutation(CREATE_TASK);
  const [updateTaskMutation] = useMutation(EDIT_TASK);
  const handleCreateTask = async () => {
    if (!validations()) return;
    if (isEditing) {
      await editTask();
      setIsEditing(false);
    } else {
      await createTask();
    }
  };
  const editTask = async () => {
    try {
      await updateTaskMutation({
        variables: {
          input: {
            dueDate: dateValue?.toISOString(),
            id: selectedTaskId,
            name: taskTitle,
            pointEstimate: handlePointEstimate(selectedEstimate!),
            status: selectedStatus,
            tags: [selectedLabel],
          },
        },
      });

      clearModalStates();
      notifications.show({
        title: 'Task edited',
        message: 'Task has been edited successfully',
        color: 'green',
      });
    } catch (error) {
      notifications.show({
        title: 'Error editing task',
        message: 'An error occurred while editing task',
        color: 'red',
      });
    }
  };
  const createTask = async () => {
    try {
      const res = await createTaskMutation({
        variables: {
          input: {
            dueDate: dateValue?.toISOString(),
            name: taskTitle,
            pointEstimate: handlePointEstimate(selectedEstimate!),
            status: selectedStatus,
            tags: [selectedLabel],
          },
        },
      });
      setNewTask(res.data.createTask);
      clearModalStates();
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
    }
  };

  const handlePointEstimate = (name: string) => {
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
  const validations = () => {
    if (!taskTitle) {
      notifications.show({
        title: 'Task title is required',
        message: 'Please provide task title',
        color: 'red',
      });
      return false;
    }
    if (!selectedEstimate) {
      notifications.show({
        title: 'Estimate is required',
        message: 'Please provide task estimate',
        color: 'red',
      });
      return false;
    }
    // if (!selectedAssignee) {
    //   notifications.show({
    //     title: 'Assignee is required',
    //     message: 'Please provide task assignee',
    //     color: 'red',
    //   });
    //   return false;
    // }
    if (!selectedLabel) {
      notifications.show({
        title: 'Label is required',
        message: 'Please provide task label',
        color: 'red',
      });
      return false;
    }
    if (!dateValue) {
      notifications.show({
        title: 'Due date is required',
        message: 'Please provide task due date',
        color: 'red',
      });
      return false;
    }
    return true;
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
    clearModalStates,
    isEditing,
    handleOnSelectItem,
  };
};
