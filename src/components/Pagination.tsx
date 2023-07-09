import {Button, HStack} from '@chakra-ui/react';

interface PagintaionProps {
  currentPage: number;
  totalPages: number;
  onChangePage: (page: number) => void;
}

function Pagination({currentPage, totalPages, onChangePage}: PagintaionProps) {
  return (
    <HStack spacing={2} flexWrap={'wrap'}>
      {Array(totalPages)
        .fill(0)
        .map((_, i) => (
          <Button
            key={i}
            minW={'45px'}
            variant={currentPage === i + 1 ? 'solid' : 'outline'}
            onClick={() => onChangePage(i + 1)}
          >
            {i + 1}
          </Button>
        ))}
    </HStack>
  );
}
export default Pagination;
