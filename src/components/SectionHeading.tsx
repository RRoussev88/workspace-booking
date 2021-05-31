import { FC } from 'react';

interface SectionHeadingProps {
  text: string;
}

const SectionHeading: FC<SectionHeadingProps> = ({ text }) => (
  <div className="m-6 p-6 max-w-sm bg-indigo-300 rounded-xl shadow flex">
    <h2 className="text-4xl font-semibold text-gray-100">{text}</h2>
  </div>
);

export default SectionHeading;
