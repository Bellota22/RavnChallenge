import { Avatar, CloseButton, Flex, Image, Input } from '@mantine/core';
import React, { useState } from 'react';
import classes from './Header.module.css';
import searchIcon from '../../public/searchIcon.svg';
import bellIcon from '../../public/bellIcon.svg';
import avatar from '../../public/avatar.svg';

function InputContainer() {
  const [value, setValue] = useState('');

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
