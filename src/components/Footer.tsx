import { FC } from 'react';

const Footer: FC = () => (
  <footer className="bg-gray-800 mt-auto">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="h-16 flex items-center">
        <span className="text-white">Copyright &copy; {new Date().getFullYear()}</span>
      </div>
    </div>
  </footer>
);

export default Footer;
