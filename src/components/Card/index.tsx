import { Text, Card, Image, Badge, Menu, Flex, Avatar, Button } from '@mantine/core';
import threeDotsIcon from '../../public/threeDotsIcon.svg';
import clockIcon from '../../public/clockIcon.svg';
import clockIconRed from '../../public/clockIconRed.svg';
import clockIconYellow from '../../public/clockIconYellow.svg';
import avatar from '../../public/avatar.svg';
import clipIcon from '../../public/clipIcon.svg';
import pullRequestIcon from '../../public/pullRequestIcon.svg';
import commentIcon from '../../public/commentIcon.svg';
import editTaskIcon from '../../public/editTaskIcon.svg';
import trashIcon from '../../public/trashIcon.svg';
import classes from './CardDashboard.module.css';
import { useCardDashboard } from './useCardDashboard';

interface CardDashboardProps {
  id: number;
  title: string;
  estimate: string;
  dueDate: string;
  taskTags: [string];
  position?: GLfloat;
  userId?: any;
  status: string;
  fullName: string;
}

function CardDashboard(
  {
    id,
    title,
    estimate,
    dueDate,
    taskTags,
    position,
    userId,
    status,
    fullName,

  }: CardDashboardProps) {
  const {
    handleTagColor,
    badgeColor,
    badgeText,
    daysDifference,
    handleDeleteTask,
    handleEditTask,
  } = useCardDashboard(dueDate, id, taskTags, estimate, title, userId, status, fullName);
  return (
    <Card
      classNames={{
        root: classes.card,
      }}>
      <Flex justify="space-between" align="center" mb="xs">
        <Text fw={600} c="var(--mantine-color-neutral-1)">{title}</Text>
        <Menu>
          <Menu.Target>
            <Button w="auto" bg="var(--mantine-color-neutral-4)">
              <Image
                src={threeDotsIcon}
                alt="threeDotsIcon"
              />
            </Button>
          </Menu.Target>
          <Menu.Dropdown
            classNames={{
              dropdown: classes.dropdown,
            }}
          >
            <Menu.Item
              onClick={handleEditTask}
              classNames={{
                item: classes.menuItem,
              }}
              leftSection={<Image src={editTaskIcon} />}>
                Editar
            </Menu.Item>
            <Menu.Item
              onClick={handleDeleteTask}
              classNames={{
                item: classes.menuItem,
              }}
              leftSection={<Image src={trashIcon} />}>
                Eliminar
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Flex>
      <Flex justify="space-between" align="center" mb="xs">
        <Text fw={600} c="var(--mantine-color-neutral-1)">{estimate} Pts</Text>
        <Badge
          className={`${classes.tag} ${badgeColor}`}
          leftSection={
          <Image
            src={
            daysDifference < 0 ? clockIconRed
              : daysDifference <= 2 ? clockIconYellow
                : clockIcon
            }
            alt="clockIcon" />
        }>
          {badgeText}
        </Badge>
      </Flex>
      <Flex gap="15px" mb="xs">
      {taskTags && taskTags.length > 0 && taskTags.slice(0, 2).map((taskTag, index) => (
        <Badge
          key={index}
          className={`${classes.tag} ${handleTagColor(taskTag)}`}
        >
          {taskTag}
        </Badge>
      ))}
      {taskTags && taskTags.length > 2 && (
        <Badge
          className={`${classes.tagMore} ${classes.tagNeutral}`}
          style={{ fontSize: '0.8em' }} // Ajusta el tamaño de la fuente para hacerlo más pequeño
        >
          +  {test.length - 2}
        </Badge>
      )}
      </Flex>
      <Flex justify="space-between" gap="15px" mt={10}>
          <Avatar
            src={avatar}
            alt="avatar"
            h={32}
            w={32}
          />
          <Text c="var(--mantine-color-neutral-1)">{fullName}</Text>
        <Flex gap={10} c="var(--mantine-color-neutral-1)" align="center">
          <Image
            src={clipIcon}
            alt="clipIcon"
            w={16}
            h={16}
          />
          {position}
          <Image
            src={pullRequestIcon}
            alt="pullRequestIcon"
            w={16}
            h={16}
          />
          5
          <Image
            src={commentIcon}
            alt="commentIcon"
            w={16}
            h={16}
          />
        </Flex>
      </Flex>
    </Card>
  );
}

export default CardDashboard;
