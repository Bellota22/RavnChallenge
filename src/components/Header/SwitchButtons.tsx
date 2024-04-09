import { Flex, Image } from '@mantine/core';
import dashboardIconClicked from '../../public/dashboardIconClicked.svg';
import dashboardIconNoClicked from '../../public/dashboardIconNoClicked.svg';
import myTaskIconClicked from '../../public/myTaskIconClicked.svg';
import myTaskIconNoClicked from '../../public/myTaskIconNoClicked.svg';
import plusIcon from '../../public/plusIcon.svg';
import classes from './Header.module.css';
import { useAppContext } from '../Context';
import CreateTaskModal from '../Modal/CreateTask';

function SwitchButtons() {
  const {
    dashboard,
    setDashboard,
    taskList,
    setTaskList,
    setSlowTransitionOpened,
  } = useAppContext();

  return (
    <Flex gap={10} m={10} h={48} justify="space-between" align="center">
      <Flex align="center">
        <Image
          onClick={() => setTaskList(!taskList)}
          className={`${classes.buttonHeader} ${taskList ? classes.buttonHeaderActive : ''}`}
          src={taskList ? myTaskIconClicked : myTaskIconNoClicked}
          alt="dashboardIconClicked"
        />
        <Image
          onClick={() => setDashboard(!dashboard)}
          className={`${classes.buttonHeader} ${dashboard ? classes.buttonHeaderActive : ''}`}
          src={dashboard ? dashboardIconClicked : dashboardIconNoClicked}
          alt="dashboardIconClicked"
        />
      </Flex>
      <Image
        onClick={() => setSlowTransitionOpened(true)}
        className={`${classes.buttonPlusIcon}`}
        src={plusIcon}
        alt="dashboardIconClicked"
      />
      <CreateTaskModal />
    </Flex>
  );
}

export default SwitchButtons;
