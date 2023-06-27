import {
  Button,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Modal,
} from '@chakra-ui/react';

interface ConfirmationModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onClose: () => void;
}

function ConfirmationModal({isOpen, title, message, onConfirm, onClose}: ConfirmationModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>{message}</Text>
        </ModalBody>

        <ModalFooter justifyContent={'flex-start'}>
          <Button
            mr={3}
            onClick={() => {
              onConfirm();
              onClose();
            }}
          >
            Delete
          </Button>
          <Button onClick={onClose} variant='ghost'>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default ConfirmationModal;
