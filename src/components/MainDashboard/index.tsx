import { AppShell, Text, Table, ScrollArea } from '@mantine/core';
import classes from './MainDashboard.module.css';
import CardDashboard from '../Card';
import { useMainDashBoard } from './useMainDashbBoard';

function MainDashboard() {
  const { dataDisplay, pointEstimatedHanlde } = useMainDashBoard();
  return (
    <ScrollArea>
      <AppShell.Main pt={180} bg="var(--mantine-color-neutral-5)">
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
                  {section.tasks.length === 0 ? (
                      <Text c="white">No tasks in this section</Text>
                    ) : (
                      section.tasks.map((task: any, taskIndex: number) => (
                        <CardDashboard
                          key={taskIndex}
                          id={task.id}
                          title={task.name}
                          estimate={pointEstimatedHanlde(task.pointEstimate)}
                          dueDate={task.dueDate}
                          taskTags={task.tags}
                          avatarUser={task?.assignee?.avatar}
                          position={task.position}
                        />
                      ))
                    )}
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
