import { FC } from 'react';

const Loader: FC = () => (
  <div className="p-2 sm:p-6 flex justify-center bg-gray-100 z-0">
    <div className="loader__circle animate-bounce" />
    <div className="loader__circle animate-bounce200" />
    <div className="loader__circle animate-bounce400" />
  </div>
);

export default Loader;
