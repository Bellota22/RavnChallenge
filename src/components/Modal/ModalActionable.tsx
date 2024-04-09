import { Button, Image, Menu, Text } from '@mantine/core';
import { useState } from 'react';
import classes from './CreateTask.module.css';

interface MenuItem {
  name: string;
  icon: string;
}

export interface MenuData {
  label: string;
  icon?: string;
  items: MenuItem[];
}
interface ModalActionableProps {
  menuData: MenuData;
  onSelectItem: (name: string) => void;
}

function ModalActionable({ menuData, onSelectItem }: ModalActionableProps) {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const handleItemClick = (name: string) => {
    onSelectItem(name);
    setSelectedItem(name);
  };
  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <Button
          className={classes.buttonActionable}
          leftSection={
            <Image
              src={menuData.icon}
              alt="icon"
            />
          }>
          <Text className={classes.buttonActionableText}>
            {selectedItem || menuData.label}
          </Text>
        </Button>
      </Menu.Target>

      <Menu.Dropdown
        w="auto"
        classNames={{
        dropdown: classes.dropdown,
      }}>
        <Menu.Label classNames={{ label: classes.label }}>{menuData.label}</Menu.Label>
        {menuData?.items?.map((item, index) => (
          <Menu.Item
            key={index}
            classNames={{ item: classes.item }}
            onClick={() => handleItemClick(item.name)}
            leftSection={<Image src={item.icon} w={18} h={18} alt="itemIcon" />}
          >
            {item.name}
          </Menu.Item>
        ))}
      </Menu.Dropdown>
    </Menu>
  );
}

export default ModalActionable;
