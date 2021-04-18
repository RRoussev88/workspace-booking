import { FC, ReactElement } from 'react';

type SvgIconProps = {
  path: ReactElement;
};

const SvgIcon: FC<SvgIconProps> = ({ path }) => (
  <svg
    className="block h-6 w-6"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    aria-hidden="true"
  >
    {path}
  </svg>
);

export default SvgIcon;
