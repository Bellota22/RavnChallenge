import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { Router } from './Router';
import { theme } from './theme';
import { AppContextProvider } from './components/Context';

export default function App() {
  return (
    <MantineProvider theme={theme}>
      <Notifications />
      <AppContextProvider>
        <Router />
      </AppContextProvider>
    </MantineProvider>
  );
}
