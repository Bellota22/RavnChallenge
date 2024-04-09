import { AppShell, Burger, Group, Skeleton, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { SideBar } from '../components/Sidebar';
import { Header } from '../components/Header';
import MainTaskList from '../components/MainTaskList';
import MainDashboard from '../components/MainDashboard';
import { useAppContext } from '@/components/Context';

export function HomePage() {
  // const [opened, { toggle }] = useDisclosure();
  // const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  // const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);
  const {
    taskList,
    dashboard,
  } = useAppContext();

  return (
    <AppShell
      layout="alt"
      navbar={{
        width: 300,
        breakpoint: 'sm',
        // collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
      }}
    >
      <SideBar />
      <Header />
      {taskList && <MainTaskList />}
      {dashboard && <MainDashboard />}

    </AppShell>
  );
}
