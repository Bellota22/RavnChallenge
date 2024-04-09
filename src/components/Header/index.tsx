import { AppShell } from '@mantine/core';

import InputContainer from './InputContainer';
import SwitchButtons from './SwitchButtons';

export function Header() {
  return (
    <AppShell.Header pr={32} bg="var(--mantine-color-neutral-5)" withBorder={false}>
      <InputContainer />
      <SwitchButtons />
    </AppShell.Header>
  );
}
