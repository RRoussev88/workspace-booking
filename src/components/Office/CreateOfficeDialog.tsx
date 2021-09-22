import { Dialog, Transition } from '@headlessui/react';
import { AuthContext } from 'authContext';
import CustomFormInput from 'components/CustomFormInput';
import CustomTextArea from 'components/CustomTextArea';
import { Office, OfficeType } from 'models/office';
import { ChangeEvent, ChangeEventHandler, FC, Fragment, useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

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
      organizationId: orgId,
      name: officeState.name ?? '',
      address: officeState.address ?? '',
      description: officeState.description ?? '',
      contact: auth.coworker?.coworkerEmail ? [auth.coworker.coworkerEmail] : [], // Put current user email
      capacity: officeState.capacity ?? 0,
      occupied: 0,
    };
    handleCloseModal(newOffice);
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="fixed inset-0 z-10 overflow-y-auto" onClose={() => handleCloseModal()}>
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
                {`Create ${type} office`}
              </Dialog.Title>
              <form className="max-w-sm mx-auto my-4 sm:my-6 lg:my-8 bg-gray-100 p-4 sm:p-6 lg:p-8 rounded shadow">
                <fieldset className="text-gray-600">
                  <legend className="mx-auto ext-sm text-gray-500">
                    {type === OfficeType.SIMPLE && 'Create an office with specified number of work places'}
                  </legend>
                  <CustomFormInput
                    name="name"
                    label="Office Name"
                    containerClasses="mt-9"
                    placeholder="Enter Office Name"
                    value={officeState.name ?? ''}
                    onChange={handleFormChange}
                    required
                  />
                  <CustomFormInput
                    name="address"
                    label="Office address"
                    containerClasses="mt-9"
                    placeholder="Enter Office address"
                    value={officeState.address ?? ''}
                    onChange={handleFormChange}
                    required
                  />
                  <CustomTextArea
                    name="description"
                    label="Office Description"
                    containerClasses="mt-9"
                    placeholder="Enter Office Description"
                    value={officeState.description ?? ''}
                    onChange={handleFormChange}
                  />
                  <CustomFormInput
                    name="capacity"
                    type="number"
                    label="Office capacity"
                    containerClasses="mt-9"
                    placeholder="Enter Office capacity"
                    value={officeState.capacity ?? ''}
                    onChange={handleFormChange}
                    required
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
                  disabled={submitDisabled}
                  onClick={handleSubmit}
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

export default CreateOfficeDialog;
