import { AppShell, Box, Image, Stack } from '@mantine/core';
import classes from './Sidebar.module.css';
import logo from '../../public/logo.svg';
import GlobalItem from '../GlobalItem';
import dashboardIconClicked from '../../public/dashboardIconClicked.svg';
import dashboardIconNoClicked from '../../public/dashboardIconNoClicked.svg';
import myTaskIconClicked from '../../public/myTaskIconClicked.svg';
import myTaskIconNoClicked from '../../public/myTaskIconNoClicked.svg';
import { useAppContext } from '../Context';

export function SideBar() {
  const {
    dashboard,
    setDashboard,
    taskList,
    setTaskList,
    setDashboardOnHover,
    setTaskListOnHover,
    dashboardOnHover,
    taskListOnHover,
  } = useAppContext();

  return (
    <AppShell.Navbar bg="var(--mantine-color-neutral-5)" withBorder={false}>
    <Box className={classes.sidebar}>
      <Image h={40} w={40} src={logo} />
      <Stack w="100%" mt="10" align="flex-start">
        <GlobalItem
          label="DASHBOARD"
          sideBarItem
          iconClicked={dashboardIconClicked}
          iconNoClicked={dashboardIconNoClicked}
          item={dashboard}
          setItem={setDashboard}
          onHover={dashboardOnHover}
          setOnHover={setDashboardOnHover}
        />
        <GlobalItem
          label="MY TASKS"
          sideBarItem
          iconClicked={myTaskIconClicked}
          iconNoClicked={myTaskIconNoClicked}
          item={taskList}
          setItem={setTaskList}
          onHover={taskListOnHover}
          setOnHover={setTaskListOnHover}
         />
      </Stack>
    </Box>
    </AppShell.Navbar>
  );
}
