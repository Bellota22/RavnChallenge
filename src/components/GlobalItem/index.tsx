import { Checkbox } from '@mantine/core';
import classes from './GlobalItem.module.css';
import SidebarItem from './SidebarItem';

interface GlobalItemProps {
  label: string;
  sideBarItem?: boolean;
  iconClicked?: string | undefined;
  iconNoClicked?: string | undefined;
  item: boolean;
  setItem: React.Dispatch<React.SetStateAction<boolean>>;
  onHover: boolean;
  setOnHover: React.Dispatch<React.SetStateAction<boolean>>;
}
function GlobalItem({
  label,
  sideBarItem,
  iconClicked,
  iconNoClicked,
  item,
  setItem,
  onHover,
  setOnHover,
}: GlobalItemProps) {
  return (
    sideBarItem ?
      <SidebarItem
        label={label}
        iconClicked={iconClicked}
        iconNoClicked={iconNoClicked}
        item={item}
        setItem={setItem}
        setOnHover={setOnHover}
        onHover={onHover}
      />
    :
      <Checkbox
        label={label}
        checked={item}
        classNames={classes}
        onChange={(event) => setItem(event.currentTarget.checked)}
        wrapperProps={{
          onClick: () => setItem((c: boolean) => !c),
        }}
      />
  );
}

export default GlobalItem;
