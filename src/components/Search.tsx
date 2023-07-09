import {Button, Icon, Input, InputGroup, InputRightElement} from '@chakra-ui/react';
import {FormEvent, useRef} from 'react';
import {BsSearch} from 'react-icons/bs';

function Search({onSearch}: {onSearch: (search: string) => void}) {
  const ref = useRef<HTMLInputElement>(null);

  const searchHandler = (evt: FormEvent) => {
    evt.preventDefault();
    if (ref.current) {
      onSearch(ref.current ? ref.current.value : '');
      ref.current.value = '';
    }
  };

  return (
    <form onSubmit={searchHandler}>
      <InputGroup size='md'>
        <Input size={'md'} type='text' placeholder='Search post' ref={ref} />
        <InputRightElement>
          <Button variant={'ghost'} onClick={searchHandler}>
            <Icon as={BsSearch}></Icon>
          </Button>
        </InputRightElement>
      </InputGroup>
    </form>
  );
}

export default Search;
