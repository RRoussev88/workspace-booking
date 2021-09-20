import SvgIcon from 'components/SvgIcon';
import { ReactElement } from 'react';
import { Link } from 'react-router-dom';

type BaseItem = { id: string; name: string };

type ListItemComponent = <ItemType extends BaseItem>(
  props: ListItemProps<BaseItem>,
) => ReactElement<ListItemProps<ItemType>>;

interface ListItemProps<T extends BaseItem> {
  item: T;
  isAuthorized?: boolean;
  onDelete: (id: string) => void;
}

const ListItem: ListItemComponent = ({ item, isAuthorized, onDelete }) => {
  const onDeleteOrg = () => {
    onDelete(item.id);
  };

  return (
    <div className="list__item">
      <span className="m-1 sm:text-xl font-normal text-gray-400">{item.name}</span>
      {isAuthorized ? (
        <div className="flex flex-wrap">
          <Link to={item.id} className="action-button flex-grow flex-shrink-0 m-1 bg-blue-500 hover:bg-blue-400">
            <SvgIcon>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
              />
            </SvgIcon>
          </Link>
          <button
            type="submit"
            onClick={onDeleteOrg}
            className="action-button flex-grow flex-shrink-0 m-1 bg-red-400 hover:bg-red-300"
          >
            <SvgIcon>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </SvgIcon>
          </button>
        </div>
      ) : (
        <div className="flex flex-wrap">
          <div className="w-12 m-1" />
          <Link
            to={item.id}
            className="action-button flex-grow flex-shrink-0 m-1 text-gray-400 bg-yellow-300 hover:bg-yellow-200"
          >
            <SvgIcon>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            </SvgIcon>
          </Link>
        </div>
      )}
    </div>
  );
};

export default ListItem;
