import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Text,
  ModalFooter,
  ButtonProps,
} from '@chakra-ui/react';
import {ReactNode} from 'react';

interface ButtonWithConfirmProps extends ButtonProps {
  children: ReactNode;
  title: string;
  message: string;
  confirmButtonText: string;
  onConfirm: () => void;
}

function ButtonWithConfirm({
  children,
  title,
  message,
  confirmButtonText,
  onConfirm,
  ...props
}: ButtonWithConfirmProps) {
  const {isOpen, onOpen, onClose} = useDisclosure();

  const onConfirmHandler = () => {
    onConfirm();
    onClose();
  };

  return (
    <>
      <Button onClick={onOpen} {...props}>
        {children}
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>{message}</Text>
          </ModalBody>

          <ModalFooter justifyContent={'flex-start'}>
            <Button mr={3} onClick={onConfirmHandler}>
              {confirmButtonText}
            </Button>
            <Button onClick={onClose} variant='ghost'>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
export default ButtonWithConfirm;
