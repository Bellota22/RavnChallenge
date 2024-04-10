import { Avatar, CloseButton, Flex, Image, Input } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import classes from './Header.module.css';
import searchIcon from '../../public/searchIcon.svg';
import bellIcon from '../../public/bellIcon.svg';
import avatar from '../../public/avatar.svg';
import { useAppContext } from '../Context';

function InputContainer() {
  const [value, setValue] = useState('');
  const { dataTasks, setFilteredTasks } = useAppContext();
  console.log('🚀 ~ InputContainer ~ dataTasks:', dataTasks);

  const filterTasks = (searchTerm: string) => {
    const lowValue = searchTerm.toLowerCase();
    const filteredTasks = dataTasks?.tasks?.filter((task: any) => {
      const matchesStatus = task.status.toLowerCase().includes(lowValue);
      const matchesName = task.name.toLowerCase().includes(lowValue);
      const matchesTags = task.tags.some(
        (tag: any) => tag.toLowerCase().includes(lowValue)
      );
      const taskDate = new Date(task.dueDate);
      const formattedDate = taskDate.toLocaleDateString().toLowerCase();
      const matchesDate = formattedDate.includes(lowValue);
      // Devolver el objeto task si al menos un criterio de búsqueda coincide
      if (matchesStatus || matchesName || matchesTags || matchesDate) {
        return task;
      }
      return false; // Si no se cumple ningún criterio, devolver false
    });
    return filteredTasks || [];
  };
  useEffect(() => {
    const filteredTasks = filterTasks(value);
    setFilteredTasks(filteredTasks);
  }, [value]);

  // Filtrar las tareas según el término de búsqueda
  return (
    <Flex className={classes.barContainer} justify="space-between" align="center">
      <Image
        src={searchIcon}
        alt="searchIcon"
      />
      <Input
        placeholder="Search"
        classNames={classes}
        value={value}
        onChange={(event) => setValue(event.currentTarget.value)}
        rightSectionPointerEvents="all"
        rightSection={
        <CloseButton
          onClick={() => setValue('')}
          style={{ display: value ? undefined : 'none' }}
        />
      }
    />
      <Image
        src={bellIcon}
        alt="bellIcon"
      />
      <Avatar
        src={avatar}
        alt="avatar"
      />
    </Flex>
  );
}

export default InputContainer;
