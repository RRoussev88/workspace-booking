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
import { v4 as uuidv4 } from 'uuid';
import { CustomFormInput, CustomTextArea } from '..';
import { AuthContext } from '../../authContext';
import { Organization, OrgType } from '../../models';

interface CreateOrganizationDialogProps {
  isOpen: boolean;
  type: OrgType;
  onCloseModal: (newOrg?: Organization) => void;
}

const CreateOrganizationDialog: FC<CreateOrganizationDialogProps> = ({ isOpen, type, onCloseModal }) => {
  const auth = useContext(AuthContext);
  const [orgState, setOrgState] = useState<Partial<Organization>>({});

  const submitDisabled: boolean = !orgState.name;

  const handleFormChange: ChangeEventHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setOrgState((prevState) => ({ ...prevState, [event.target.name]: event.target.value }));
  };

  const handleCloseModal = (newOrg?: Organization) => {
    setOrgState({});
    onCloseModal(newOrg);
  };

  const handleSubmit = async () => {
    const openOrg: Organization = {
      id: uuidv4(),
      type,
      name: orgState.name ?? '',
      description: orgState.description ?? '',
      contact: auth.coworker?.coworkerEmail ? [auth.coworker.coworkerEmail] : [], // Put current user email
      offices: [],
      participants: [],
    };
    handleCloseModal(openOrg);
  };

  return (
    <Modal isOpen={isOpen} onClose={() => handleCloseModal()}>
      <ModalOverlay />
      <ModalContent className="inline-block w-full max-w-md p-2 sm:p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-2xl rounded-2xl border-2 border-gray-200">
        <ModalHeader as="h3" className="text-lg font-medium leading-6 text-gray-900">
          Create {type} organization
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody as="form" className="my-2 bg-gray-100 p-2 sm:p-6 rounded shadow">
          <Heading as="legend" size="sm" className="mx-auto text-gray-500 mt-4">
            {type === OrgType.OPEN ? 'Create coworking space' : 'Company with offices'}
          </Heading>
          <Stack as="fieldset" spacing={6} className="py-2 sm:py-6 text-gray-600">
            <CustomFormInput
              name="name"
              label="Organization Name"
              placeholder="Enter Organization Name"
              value={orgState.name ?? ''}
              onChange={handleFormChange}
              required
            />
            <CustomTextArea
              name="description"
              label="Organization Description"
              placeholder="Enter Organization Description"
              value={orgState.description ?? ''}
              onChange={handleFormChange}
            />
            <CustomFormInput
              name="image"
              label="Organization Image"
              placeholder="Select Organization Image"
              value={orgState.image ?? ''}
              onChange={handleFormChange}
              disabled
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

export default CreateOrganizationDialog;
