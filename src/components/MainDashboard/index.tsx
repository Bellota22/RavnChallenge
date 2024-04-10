import { AppShell, Text, Table, ScrollArea, Skeleton } from '@mantine/core';
import classes from './MainDashboard.module.css';
import CardDashboard from '../Card';
import { useMainDashBoard } from './useMainDashbBoard';

function MainDashboard() {
  const { dataDisplay, pointEstimatedHanlde, loadingTasks } = useMainDashBoard();
  return (
    <ScrollArea>
      <AppShell.Main className={classes.main}>
        <Table withRowBorders={false} className={classes.thead}>
          <Table.Thead>
            <Table.Tr>
            {dataDisplay.map((section, sectionIndex) => (
                <Table.Th key={sectionIndex} className={classes.th}>
                  <Text className={classes.tableHeaderItems}>{section.status}</Text>
                </Table.Th>
              ))}
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            <Table.Tr>
            {dataDisplay.map((section, sectionIndex) => (
                <Table.Td className={classes.td} key={sectionIndex}>
                  <ScrollArea h="calc(100vh - 300px)" key={sectionIndex}>
                    {section.tasks.length === 0 && !loadingTasks && (<Text c="white">No tasks in this section</Text>)}
                    {
                      section.tasks.length > 0 && !loadingTasks &&
                        section?.tasks?.map(
                          (task: any, taskIndex: number) => (
                          <CardDashboard
                            key={taskIndex}
                            id={task.id}
                            title={task.name}
                            estimate={pointEstimatedHanlde(task.pointEstimate)}
                            dueDate={task.dueDate}
                            taskTags={task.tags}
                            userId={task?.assignee?.id}
                            position={task.position}
                            status={task?.status}
                            fullName={task?.assignee?.fullName}
                          />
                      )
                        )
                    }
                    {loadingTasks && (<Skeleton w={348} h={200} />)}
                  </ScrollArea>
                </Table.Td>
              ))}
            </Table.Tr>
          </Table.Tbody>
        </Table>
      </AppShell.Main>
    </ScrollArea>

  );
}

export default MainDashboard;
