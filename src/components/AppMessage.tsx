import { FC } from 'react';
import { AppMessageVariant } from 'models/types';

interface AppMessageProps {
  text: string;
  variant: AppMessageVariant;
}

const AppMessage: FC<AppMessageProps> = ({ text, variant }) => (
  <p
    className={`m-2 sm:m-6 p-2 sm:p-6 border-2 border-${variant}-300 rounded sm:rounded-xl m:text-lg break-all sm:break-normal font-semibold text-${variant}-300`}
  >
    {text}
  </p>
);

export default AppMessage;
