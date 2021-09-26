import { Dialog } from '@headlessui/react';
import { ChangeEvent, ChangeEventHandler, FC, useContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { BaseModalDialog, CustomFormInput, CustomTextArea } from '..';
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
    <BaseModalDialog isOpen={isOpen} onClose={() => handleCloseModal()}>
      <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-2xl rounded-2xl border-2 border-gray-200">
        <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
          {`Create ${type} organization`}
        </Dialog.Title>
        <form className="max-w-sm mx-auto my-4 sm:my-6 lg:my-8 bg-gray-100 p-4 sm:p-6 lg:p-8 rounded shadow">
          <fieldset className="text-gray-600">
            <legend className="mx-auto text-gray-500">
              {type === OrgType.OPEN ? 'Create coworking space' : 'Company with offices'}
            </legend>
            <CustomFormInput
              name="name"
              label="Organization Name"
              containerClasses="mt-9"
              placeholder="Enter Organization Name"
              value={orgState.name ?? ''}
              onChange={handleFormChange}
              required
            />
            <CustomTextArea
              name="description"
              label="Organization Description"
              containerClasses="mt-9"
              placeholder="Enter Organization Description"
              value={orgState.description ?? ''}
              onChange={handleFormChange}
            />
            <CustomFormInput
              name="image"
              label="Organization Image"
              containerClasses="mt-9"
              placeholder="Select Organization Image"
              value={orgState.image ?? ''}
              onChange={handleFormChange}
              disabled
            />
          </fieldset>
        </form>
        <div className="mt-4 flex justify-between">
          <button type="button" className="form__button form__button__cancel" onClick={() => handleCloseModal()}>
            Cancel
          </button>
          <button
            type="button"
            className={`form__button form__button__success ${
              submitDisabled ? 'hover:bg-gray-300 bg-gray-300 cursor-default' : ''
            }`}
            onClick={handleSubmit}
            disabled={submitDisabled}
          >
            Create
          </button>
        </div>
      </div>
    </BaseModalDialog>
  );
};

export default CreateOrganizationDialog;
