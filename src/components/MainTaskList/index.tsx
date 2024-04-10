import { AppShell, Box, Text, Table } from '@mantine/core';
import classes from './MainTaskList.module.css';
import { useMainTaskList } from './useMainTaskList';

function MainTaskList() {
  const { accordionSections, titleHeader } = useMainTaskList();
  return (
    <AppShell.Main className={classes.main}>
      <Table withTableBorder withColumnBorders className={classes.thead}>
        <Table.Thead>
          <Table.Tr>
            {
              titleHeader.map((title, index) => (
                <Table.Th key={index} className={classes.th}>
                  <Text className={classes.tableHeaderItems}>{title}</Text>
                </Table.Th>
              ))
            }
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
