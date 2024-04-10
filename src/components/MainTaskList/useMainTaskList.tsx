import { Accordion, Text, Table, Flex, Badge } from '@mantine/core';
import { useEffect, useState } from 'react';
import { useAppContext } from '../Context';
import classes from './MainTaskList.module.css';

export const useMainTaskList = () => {
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

  const titleHeader = [
    'Task Name',
    'Task Tags',
    'Estimate',
    'Task Assign Name',
    'Due Date',
  ];
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
    const getRowColor = (dueDate: any) => {
      const currentDate = new Date().getTime();
      const dueDateObj = new Date(dueDate).getTime();
      const differenceInDays = Math.floor((dueDateObj - currentDate) / (1000 * 60 * 60 * 24));
      if (differenceInDays < 0) {
        return classes.red;
      }
      if (differenceInDays < 3) {
        return classes.yellow;
      }
      return classes.green;
    };
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
    const accordionSections = dataDisplay.map((section: any, index: any) => (
      <Accordion chevronPosition="left" key={index} classNames={classes}>
        <Accordion.Item key={`${section.status}-${index}`} value={section.status}>
          <Accordion.Control>
            <Text className={classes.panelTitle}>
              {section.status}
            </Text>
          </Accordion.Control>
          <Accordion.Panel>
            <Table withTableBorder withColumnBorders>
              <Table.Tbody>
                {section.tasks.map((task: any, indexContent: any) => (
                  <Table.Tr className={`${classes.tr} ${getRowColor(task.dueDate)}`} key={indexContent}>
                    <Table.Td key={indexContent} className={classes.td}>
                      <Text className={classes.tableHeaderItems}>{task.name}</Text>
                    </Table.Td>
                    <Table.Td className={classes.td}>
                    <Flex gap="15px" mb="xs">
                      {task.tags && task.tags.length > 0 &&
                        task.tags.slice(0, 2).map((taskTag: any) => (
                        <Badge
                          className={`${classes.tag} ${handleTagColor(taskTag)}`}
                        >
                          {taskTag}
                        </Badge>
                      ))}
                      { task.tags && task.tags.length > 2 && (
                        <Badge
                          className={`${classes.tagMore} ${classes.tagNeutral}`}
                          style={{ fontSize: '0.8em' }} // Ajusta el tamaño de la fuente para hacerlo más pequeño
                        >
                          +  {test.length - 2}
                        </Badge>
                      )}
                    </Flex>
                    </Table.Td>
                    <Table.Td className={classes.td}>
                      <Text className={classes.tableHeaderItems}>
                      {pointEstimatedHanlde(task.pointEstimate)} Points
                      </Text>
                    </Table.Td>
                    <Table.Td className={classes.td}>
                      <Text className={classes.tableHeaderItems}>{task.assignee ? task.assignee.name : 'Unassigned'}</Text>
                    </Table.Td>
                    <Table.Td className={classes.td}>
                      <Text className={classes.tableHeaderItems}>
                      {new Date(task.dueDate).toLocaleDateString()}
                      </Text>
                    </Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    ));
  return {
    loadingTasks,
    errorTasks,
    dataDisplay,
    pointEstimatedHanlde,
    accordionSections,
    titleHeader,
  };
};
