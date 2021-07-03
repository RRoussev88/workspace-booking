import { FC, ReactElement } from 'react';

type SvgIconProps = {
  // Type that better!
  children: ReactElement<SVGPathElement> | ReactElement<SVGPathElement>[];
};

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
