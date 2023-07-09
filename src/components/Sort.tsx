import {SortType} from '../types';
import {
  Button,
  Menu,
  MenuButton,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
} from '@chakra-ui/react';
import {Dispatch, SetStateAction} from 'react';
import {BsArrowDownShort} from 'react-icons/bs';

const SORT_TYPES = {
  asc: 'Descending',
  desc: 'Ascending',
  popular: 'Popular',
};

interface SortProps {
  sort: SortType;
  setSort: Dispatch<SetStateAction<SortType>>;
}

function Sort({sort, setSort}: SortProps) {
  return (
    <Menu closeOnSelect>
      <MenuButton as={Button} rightIcon={<BsArrowDownShort />}>
        {SORT_TYPES[sort]}
      </MenuButton>
      <MenuList>
        <MenuOptionGroup type='radio' value={sort} onChange={(value) => setSort(value as SortType)}>
          {Object.keys(SORT_TYPES).map((key) => (
            <MenuItemOption key={key} value={key}>
              {SORT_TYPES[key as SortType]}
            </MenuItemOption>
          ))}
        </MenuOptionGroup>
      </MenuList>
    </Menu>
  );
}

export default Sort;
