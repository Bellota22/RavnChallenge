import { Button, Flex, Image, Input, Menu, Modal } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import classes from './CreateTask.module.css';
import ModalActionable, { MenuData } from './ModalActionable';
import { useCreateTask } from './useCreateTask';
import calendarIcon from '../../public/calendarIcon.svg';

function CreateTaskModal() {
  const {
    actionablesData,
    setSelectedEstimate,
    setSelectedAssignee,
    setSelectedLabel,
    dateValue,
    setDateValue,
    slowTransitionOpened,
    setSlowTransitionOpened,
    taskTitle,
    setTaskTitle,
    handleCreateTask,
   } = useCreateTask();
  return (
    <Modal
      opened={slowTransitionOpened}
      onClose={() => setSlowTransitionOpened(false)}
      transitionProps={{ transition: 'rotate-left' }}
      classNames={{
          body: classes.modalBody,
          content: classes.modalContent,
          header: classes.modalHeader,
        }}
      >
        <Input
          placeholder="Task title"
          classNames={{
            input: classes.modalInput,
          }}
          value={taskTitle}
          onChange={(event) => setTaskTitle(event.currentTarget.value)}
          rightSectionPointerEvents="all"
        />
        <Flex gap={15} align="center">
          {
            actionablesData?.map((menuData: MenuData, index: number) => (
              <ModalActionable
                key={index}
                menuData={menuData}
                onSelectItem={(name) => {
              if (menuData.label === 'Estimate') setSelectedEstimate(name);
              else if (menuData.label === 'Assign To...') setSelectedAssignee(name);
              else if (menuData.label === 'Label') setSelectedLabel(name);
            }}
          />
            ))
          }
          <Menu>
              <DatePickerInput
                classNames={{
                  input: classes.datePickerInput,
                  placeholder: classes.datePickerPlaceholder,
                }}
                minDate={new Date()}
                leftSection={<Image src={calendarIcon} />}
                placeholder="Pick date"
                value={dateValue}
                onChange={setDateValue}
              />
          </Menu>

        </Flex>
        <Flex mt={10} gap={15} w="100%" justify="end">
          <Button
            bg="none"
            onClick={setSlowTransitionOpened.bind(null, false)}
            className={classes.buttonText}
          >
            Cancel
          </Button>
          <Button
            onClick={handleCreateTask}
            className={`${classes.buttonText} ${classes.buttonCreate}`}
          >
            Create
          </Button>
        </Flex>
    </Modal>
  );
}

export default CreateTaskModal;
