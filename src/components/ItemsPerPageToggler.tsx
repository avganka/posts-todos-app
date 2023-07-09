import {
  Button,
  Menu,
  MenuButton,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
} from '@chakra-ui/react';
import {BsArrowDownShort} from 'react-icons/bs';

interface ItemsPerPageTogglerProps {
  limit: number;
  onLimitChange: (newLimit: number) => void;
}

function ItemsPerPageToggler({limit, onLimitChange}: ItemsPerPageTogglerProps) {
  return (
    <Menu closeOnSelect>
      <MenuButton minW={'60px'} as={Button} variant={'outline'} rightIcon={<BsArrowDownShort />}>
        {limit}
      </MenuButton>
      <MenuList>
        <MenuOptionGroup
          type='radio'
          value={limit.toString()}
          onChange={(value) => onLimitChange(Number(value))}
        >
          <MenuItemOption value={'10'}>10</MenuItemOption>
          <MenuItemOption value={'20'}>20</MenuItemOption>
          <MenuItemOption value={'30'}>30</MenuItemOption>
        </MenuOptionGroup>
      </MenuList>
    </Menu>
  );
}

export default ItemsPerPageToggler;
