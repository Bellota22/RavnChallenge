import { AppShell } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { SideBar } from '../components/Sidebar';
import { Header } from '../components/Header';
import MainTaskList from '../components/MainTaskList';
import MainDashboard from '../components/MainDashboard';
import { useAppContext } from '@/components/Context';

export function HomePage() {
  const [mobileOpened] = useDisclosure();
  const [desktopOpened] = useDisclosure(true);
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
        collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
      }}
    >
      <SideBar />
      <Header />
      {taskList && <MainTaskList />}
      {dashboard && <MainDashboard />}

    </AppShell>
  );
}
