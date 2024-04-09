import { Box, Image } from '@mantine/core';
import React from 'react';
import classes from './GlobalItem.module.css';

function SidebarItem({
  label,
  iconClicked,
  iconNoClicked,
  setOnHover,
  onHover,
  item,
  setItem,
}: {
  label: string,
  iconClicked: string | undefined,
  iconNoClicked: string | undefined,
  setOnHover: React.Dispatch<React.SetStateAction<boolean>>,
  onHover: boolean,
  item: boolean,
  setItem: React.Dispatch<React.SetStateAction<boolean>>,
}) {
  return (
    <Box
      className={`${classes.sideBarItem} ${item ? classes.sideBarActive : ''}`}
      onClick={
        () => setItem((c: boolean) => !c)}
      onMouseEnter={() => setOnHover(true)}
      onMouseLeave={() => setOnHover(false)}
      >
        <Image
          src={`${onHover || item ? iconClicked : iconNoClicked}`}
          alt="Dashboard"
          w={20}
          h={20}
        />
        <span>{label}</span>
    </Box>
  );
}

export default SidebarItem;
