import { Dialog, Transition } from '@headlessui/react';
import { AuthContext } from 'authContext';
import CustomFormInput from 'components/CustomFormInput';
import CustomTextArea from 'components/CustomTextArea';
import { Organization, OrgType } from 'models/organization';
import { ChangeEvent, ChangeEventHandler, FC, Fragment, useContext, useState } from 'react';
import { useDispatch } from 'react-redux';
import { createOrganization } from 'store/organizationsSlice';
import { v4 as uuidv4 } from 'uuid';

interface CreateOrganizationDialogProps {
  isOpen: boolean;
  type: OrgType;
  onCloseModal: (shouldFetch?: boolean) => void;
}

const CreateOrganizationDialog: FC<CreateOrganizationDialogProps> = ({ isOpen, type, onCloseModal }) => {
  const dispatch = useDispatch();
  const auth = useContext(AuthContext);
  const [orgState, setOrgState] = useState<Partial<Organization>>({});

  const handleFormChange: ChangeEventHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setOrgState((prevState) => ({ ...prevState, [event.target.name]: event.target.value }));
  };

  const submitDisabled = Object.keys(orgState).filter((key) => !!orgState[key as keyof typeof orgState]).length < 2;

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
    await dispatch(createOrganization(openOrg));
    setOrgState({});
    onCloseModal(true);
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="fixed inset-0 z-10 overflow-y-auto" onClose={onCloseModal}>
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span className="inline-block h-screen align-middle" aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-2xl rounded-2xl border-2 border-gray-200">
              <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                {`Create ${type} organization`}
              </Dialog.Title>
              <form className="max-w-sm mx-auto my-4 sm:my-6 lg:my-8 bg-gray-100 p-4 sm:p-6 lg:p-8 rounded shadow">
                <fieldset className="text-gray-600">
                  <legend className="mx-auto ext-sm text-gray-500">
                    {type === OrgType.OPEN ? 'Create coworking space' : 'Company with offices'}
                  </legend>
                  <CustomFormInput
                    name="name"
                    label="Organization Name"
                    containerClasses="mt-9"
                    placeholder="Enter Organization Name"
                    value={orgState.name ?? ''}
                    onChange={handleFormChange}
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
                <button type="button" className="form__button form__button__cancel" onClick={() => onCloseModal()}>
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
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default CreateOrganizationDialog;
