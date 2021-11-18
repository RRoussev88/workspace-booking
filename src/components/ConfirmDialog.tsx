import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import { FC } from 'react';

type ConfirmDialogProps = {
  isOpen: boolean;
  title: string;
  onCancel: () => void;
  onConfirm: () => void;
  text?: string;
  confirmButtonText?: string;
  confirmButtonColor?: string;
};

const ConfirmDialog: FC<ConfirmDialogProps> = ({
  isOpen,
  title,
  onCancel,
  onConfirm,
  text,
  confirmButtonText = 'Delete',
  confirmButtonColor = 'red',
}) => (
  <Modal isOpen={isOpen} onClose={onCancel}>
    <ModalOverlay />
    <ModalContent className="inline-block w-full max-w-md p-2 sm:p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-2xl rounded-2xl border-2 border-gray-200">
      <ModalHeader as="h3" className="text-lg font-medium leading-6 text-gray-900">
        {title}
      </ModalHeader>
      <ModalCloseButton />
      <ModalBody className="my-2 sm:my-6 bg-gray-100 rounded shadow">
        {!!text && <p className="p-2 sm:p-6 text-gray-500">{text}</p>}
      </ModalBody>
      <ModalFooter display="flex" alignItems="center" justifyContent="space-between" px="0">
        <Button type="button" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="button" colorScheme={confirmButtonColor} onClick={onConfirm}>
          {confirmButtonText}
        </Button>
      </ModalFooter>
    </ModalContent>
  </Modal>
);

export default ConfirmDialog;
