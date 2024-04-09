import { Accordion, AppShell, Box, Text, Table } from '@mantine/core';
import { useQuery } from '@apollo/client';
import classes from './MainTaskList.module.css';
import { GET_ALL_TASKS } from '@/api/tasks';

function MainTaskList() {
  const sections = [
    {
      title: 'To do',
      content: [
        {
        title: 'Do 10 push ups',
        estimate: '2 points',
        taskTags: 'IOS',
        asignName: 'John Doe',
        dueDate: '2021-10-10',
      },
        {
        title: 'Do 10 push ups',
        estimate: '2 points',
        taskTags: 'IOS',
        asignName: 'John Doe',
        dueDate: '2021-10-10',
      },
        {
        title: 'Do 10 push ups',
        estimate: '2 points',
        taskTags: 'IOS',
        asignName: 'John Doe',
        dueDate: '2021-10-10',
      },
        {
        title: 'Do 10 push ups',
        estimate: '2 points',
        taskTags: 'IOS',
        asignName: 'John Doe',
        dueDate: '2021-10-10',
      },
        {
        title: 'Do 10 push ups',
        estimate: '2 points',
        taskTags: 'IOS',
        asignName: 'John Doe',
        dueDate: '2021-10-10',
      },
        {
        title: 'Do 10 push ups',
        estimate: '2 points',
        taskTags: 'IOS',
        asignName: 'John Doe',
        dueDate: '2021-10-10',
      },
      ],
    },
    {
      title: 'In progress',
      content: [
        {
        title: 'Do 10 push ups ',
        estimate: '2 points',
        taskTags: 'IOS',
        asignName: 'John Doe',
        dueDate: '2021-10-10',
      },
      ],
    },
    {
      title: 'Review',
      content: [
        {
        title: ' Do 10  push upspush upspush upspush upspush upspush ups',
        estimate: '2 points',
        taskTags: 'IOS',
        asignName: 'John Doe',
        dueDate: '2021-10-10',
      },
      ],
    },
  ];
  const accordionSections = sections.map((section, index) => (
    <Accordion chevronPosition="left" key={index} classNames={classes}>
      <Accordion.Item value={section.title}>
        <Accordion.Control>
          <Text className={classes.panelTitle}>
            {section.title}
          </Text>
        </Accordion.Control>
        <Accordion.Panel>
          <Table withTableBorder withColumnBorders>
            <Table.Tbody>
              {section.content.map((task, indexContent) => (
                <Table.Tr className={classes.tr} key={indexContent}>
                    <Table.Td className={classes.td}>
                      <Text className={classes.tableHeaderItems}>{task.title}</Text>
                    </Table.Td>
                    <Table.Td className={classes.td}>
                      <Text className={classes.tableHeaderItems}>{task.taskTags}</Text>
                    </Table.Td>
                    <Table.Td className={classes.td}>
                      <Text className={classes.tableHeaderItems}>{task.estimate}</Text>
                    </Table.Td>
                    <Table.Td className={classes.td}>
                      <Text className={classes.tableHeaderItems}>{task.asignName}</Text>
                    </Table.Td>
                    <Table.Td className={classes.td}>
                      <Text className={classes.tableHeaderItems}>{task.dueDate}</Text>
                    </Table.Td>

                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  ));

  return (
    <AppShell.Main pt={180} bg="var(--mantine-color-neutral-5)">
      <Table withTableBorder withColumnBorders className={classes.thead}>
        <Table.Thead>
          <Table.Tr>
            <Table.Th className={classes.th}>
              <Text className={classes.tableHeaderItems}>Task Name</Text>
            </Table.Th>
            <Table.Th className={classes.th}>
              <Text className={classes.tableHeaderItems}>Task Tags</Text>
            </Table.Th>
            <Table.Th className={classes.th}>
              <Text className={classes.tableHeaderItems}>Estimate</Text>
            </Table.Th>
            <Table.Th className={classes.th}>
              <Text className={classes.tableHeaderItems}>Task Assign Name</Text>
            </Table.Th>
            <Table.Th className={classes.th}>
              <Text className={classes.tableHeaderItems}>Due Date</Text>
            </Table.Th>
          </Table.Tr>
        </Table.Thead>
      </Table>
      <Box className={classes.mainTaskListContainer}>
        {accordionSections}
      </Box>
    </AppShell.Main>
  );
}

export default MainTaskList;
