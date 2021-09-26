import { Dialog } from '@headlessui/react';
import { FC } from 'react';
import { BaseModalDialog } from '.';

type ConfirmDialogProps = {
  isOpen: boolean;
  title: string;
  onCancel: () => void;
  onConfirm: () => void;
  text?: string;
};

const ConfirmDialog: FC<ConfirmDialogProps> = ({ isOpen, title, onCancel, onConfirm, text }) => (
  <BaseModalDialog isOpen={isOpen} onClose={onCancel}>
    <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-2xl rounded-2xl border-2 border-gray-200">
      <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
        {title}
      </Dialog.Title>
      {!!text && (
        <div className="max-w-sm mx-auto my-4 sm:my-6 lg:my-8 bg-gray-100 p-4 sm:p-6 lg:p-8 rounded shadow">
          <p className="text-gray-500">{text}</p>
        </div>
      )}
      <div className="mt-4 flex justify-between">
        <button type="button" className="form__button form__button__cancel" onClick={onCancel}>
          Cancel
        </button>
        <button type="button" className="form__button form__button__warning" onClick={onConfirm}>
          Confirm
        </button>
      </div>
    </div>
  </BaseModalDialog>
);

export default ConfirmDialog;
