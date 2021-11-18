import {
  Button,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
} from '@chakra-ui/react';
import { ChangeEvent, ChangeEventHandler, FC, useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { CustomFormInput, CustomTextArea } from '..';
import { AuthContext } from '../../authContext';
import { Office, OfficeType } from '../../models';

interface CreateOfficeDialogProps {
  isOpen: boolean;
  type: OfficeType;
  onCloseModal: (newOffice?: Office) => void;
}

const CreateOfficeDialog: FC<CreateOfficeDialogProps> = ({ isOpen, type, onCloseModal }) => {
  const auth = useContext(AuthContext);
  const { orgId } = useParams();
  const [officeState, setOfficeState] = useState<Partial<Office>>({});

  const submitDisabled: boolean = !officeState.name || !officeState.address || !officeState.capacity;

  const handleFormChange: ChangeEventHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setOfficeState((prevState) => ({ ...prevState, [event.target.name]: event.target.value }));
  };

  const handleCloseModal = (newOffice?: Office) => {
    setOfficeState({});
    onCloseModal(newOffice);
  };

  const handleSubmit = async () => {
    const newOffice: Office = {
      id: uuidv4(),
      type,
      organizationId: orgId ?? '',
      name: officeState.name ?? '',
      address: officeState.address ?? '',
      description: officeState.description ?? '',
      contact: auth.coworker?.coworkerEmail ? [auth.coworker.coworkerEmail] : [], // Put current user email
      capacity: +(officeState.capacity ?? 0),
      occupied: 0,
    };
    handleCloseModal(newOffice);
  };

  return (
    <Modal isOpen={isOpen} onClose={() => handleCloseModal()}>
      <ModalOverlay />
      <ModalContent className="inline-block w-full max-w-md p-2 sm:p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-2xl rounded-2xl border-2 border-gray-200">
        <ModalHeader as="h3" className="text-lg font-medium leading-6 text-gray-900">
          Create {type} office
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody as="form" className="my-2 bg-gray-100 p-2 sm:p-6 rounded shadow">
          <Heading as="legend" size="sm" className="mx-auto text-gray-500 mt-4">
            {type === OfficeType.SIMPLE && 'Create an office with specified number of work places'}
          </Heading>
          <Stack as="fieldset" spacing={6} className="py-2 sm:py-6 text-gray-600">
            <CustomFormInput
              id="name"
              name="name"
              label="Office Name"
              placeholder="Enter office name"
              value={officeState.name ?? ''}
              onChange={handleFormChange}
              required
            />
            <CustomFormInput
              id="address"
              name="address"
              label="Office Address"
              placeholder="Enter office address"
              value={officeState.address ?? ''}
              onChange={handleFormChange}
              required
            />
            <CustomTextArea
              id="description"
              name="description"
              label="Office Description"
              placeholder="Enter office description"
              value={officeState.description ?? ''}
              onChange={handleFormChange}
            />
            <CustomFormInput
              id="capacity"
              name="capacity"
              label="Office Capacity"
              placeholder="Enter office capacity"
              value={officeState.capacity ?? ''}
              onChange={handleFormChange}
              type="number"
              required
            />
          </Stack>
        </ModalBody>
        <ModalFooter display="flex" alignItems="center" justifyContent="space-between" px="0">
          <Button type="button" onClick={() => handleCloseModal()}>
            Cancel
          </Button>
          <Button type="button" colorScheme="green" disabled={submitDisabled} onClick={handleSubmit}>
            Create
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CreateOfficeDialog;
