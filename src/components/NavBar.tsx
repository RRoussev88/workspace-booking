import { Transition } from '@headlessui/react';
import { AuthContext } from 'authContext';
import SvgIcon from 'components/SvgIcon';
import { NavItem } from 'models/types';
import { FC, useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { navigationItems } from 'utils';

type NavBarProps = { logo: string };

const NavBar: FC<NavBarProps> = ({ logo }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const auth = useContext(AuthContext);
  const isAuthorized = auth.isLoggedIn();

  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <NavLink key="/" to="/" end>
                <img className="h-8 w-8" src={logo} alt="Workflow" />
              </NavLink>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {navigationItems
                  .filter((item) => item.isAuthRequired === isAuthorized)
                  .map((item: NavItem) => (
                    <NavLink key={item.url} to={item.url} end className="nav-item" activeClassName="nav-item__active">
                      {item.name}
                    </NavLink>
                  ))}
              </div>
            </div>
          </div>
          {isAuthorized && (
            <button
              type="button"
              onClick={auth.logout}
              className="hidden md:block nav-item bg-red-400 hover:bg-red-300"
            >
              Logout
            </button>
          )}
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen((prevState) => !prevState)}
              type="button"
              className="bg-gray-900 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <SvgIcon
                  path={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />}
                />
              ) : (
                <SvgIcon
                  path={
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  }
                />
              )}
            </button>
          </div>
        </div>
      </div>

      <Transition
        show={isOpen}
        enter="transition ease-out duration-200 transform"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="transition ease-in duration-150 transform"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navigationItems
              .filter((item) => item.isAuthRequired === isAuthorized)
              .map((item: NavItem) => (
                <NavLink
                  key={item.url}
                  to={item.url}
                  end
                  className="nav-item burger__nav-item"
                  activeClassName="nav-item__active burger__nav-item__active"
                >
                  {item.name}
                </NavLink>
              ))}
            {isAuthorized && (
              <button type="button" onClick={auth.logout} className="nav-item w-full bg-red-400 hover:bg-red-300">
                Logout
              </button>
            )}
          </div>
        </div>
      </Transition>
    </nav>
  );
};

export default NavBar;
