import { FC, ReactChild } from 'react';

type SvgIconProps = { children: ReactChild | ReactChild[] };

const SvgIcon: FC<SvgIconProps> = ({ children }) => (
  <svg
    className="block h-6 w-6"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    aria-hidden="true"
  >
    {children}
  </svg>
);

export default SvgIcon;
