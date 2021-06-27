import { FC } from 'react';

interface SectionHeadingProps {
  text: string;
}

const SectionHeading: FC<SectionHeadingProps> = ({ text }) => (
  <div className="m-2 sm:m-6 p-2 sm:p-6  bg-indigo-300 rounded sm:rounded-xl shadow flex">
    <h2 className="sm:text-4xl break-all sm:break-normal font-semibold text-gray-100">{text}</h2>
  </div>
);

export default SectionHeading;
