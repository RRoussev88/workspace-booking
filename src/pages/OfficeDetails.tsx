import { ChangeEvent, ChangeEventHandler, FC, useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../authContext';
import { AppMessage, CustomFormInput, CustomTextArea, Loader, SectionHeading } from '../components';
import { AppMessageVariant, Office, OfficeType } from '../models';
import {
  fetchOffice,
  resetState,
  selectOfficesState,
  updateOffice,
} from '../store/officesSlice';

const OfficeDetails: FC = () => {
  const auth = useContext(AuthContext);
  const dispatch = useDispatch();
  const { officeId } = useParams();
  const { activeOffice, error, isLoading } = useSelector(selectOfficesState);
  const [officeState, setOfficeState] = useState<Office | null>(activeOffice);
  const [inEditMode, setInEditMode] = useState<boolean>(false);

  const handleFormChange: ChangeEventHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setOfficeState((prevState) => (prevState ? { ...prevState, [event.target.name]: event.target.value } : prevState));
  };

  useEffect(() => {
    if (officeId) {
      dispatch(fetchOffice(officeId));
    }

    return () => {
      dispatch(resetState());
    };
  }, [dispatch, officeId]);

  useEffect(() => {
    setOfficeState(activeOffice);
  }, [activeOffice]);

  return (
    <section className="section__layout">
      <SectionHeading text={`${officeState?.type === OfficeType.SIMPLE ? 'Simple Office' : 'Named Spaces Office'} Details`} />
      <hr className="divider" />
      {isLoading && <Loader />}
      {!isLoading && !!error && <AppMessage variant={AppMessageVariant.DANGER} text={error} />}
      {!isLoading && !error && officeState && (
        <dl className="text-gray-600">
          {inEditMode ? (
            <CustomFormInput
              name="name"
              label="Name"
              placeholder="Enter organization name"
              value={officeState.name}
              onChange={handleFormChange}
            />
          ) : (
            <>
              <dt className="text-lg underline">Name</dt>
              <dd>{officeState.name}</dd>
            </>
          )}
          {inEditMode ? (
            <CustomTextArea
              name="description"
              label="Description"
              containerClasses="mt-6"
              placeholder="Enter organization description"
              value={officeState.description}
              onChange={handleFormChange}
            />
          ) : (
            <>
              <dt className="mt-2 sm:mt-6 text-lg underline">Description</dt>
              <dd>{officeState.description}</dd>
            </>
          )}
          <dt className="mt-2 sm:mt-6 text-lg underline">Contact</dt>
          <dd className="truncate">
            <a href={`mailto:${officeState.contact}`} className="text-blue-500 underline">
              {officeState.contact}
            </a>
          </dd>
          {/* {officeState.type === OrgType.CLOSED && (
            <>
              <dt className="mt-2 sm:mt-6 text-lg underline">Participants</dt>
              <dd>{officeState.participants}</dd>
            </>
          )} */}
          {/* <dt className="mt-2 sm:mt-6 text-lg underline">Offices</dt>
          <dd className="flex flex-wrap items-center justify-between">
            <span>{`This organization has ${officeState.offices.length || 'no'} offices`}</span>
            <Link
              to={`/organizations/${orgId}/offices`}
              className="action-button w-24 m-1 text-gray-400 bg-yellow-300 hover:bg-yellow-200"
            >
              Offices
            </Link>
          </dd> */}
        </dl>
      )}
      {!!auth.coworker?.coworkerEmail && officeState?.contact.includes(auth.coworker?.coworkerEmail) && (
        <>
          <hr className="divider" />
          {inEditMode ? (
            <div className="flex flex-wrap justify-between">
              <button
                type="button"
                className="form__button form__button__cancel"
                onClick={() => {
                  setOfficeState(activeOffice);
                  setInEditMode((prevState) => !prevState);
                }}
              >
                Cancel
              </button>
              <button
                type="button"
                className="form__button form__button__success"
                onClick={async () => {
                  if (officeState) {
                    await dispatch(updateOffice(officeState));
                  }
                  setInEditMode((prevState) => !prevState);
                }}
              >
                Save
              </button>
            </div>
          ) : (
            <div className="flex flex-row-reverse">
              <button type="button" className="form__button" onClick={() => setInEditMode((prevState) => !prevState)}>
                Edit
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default OfficeDetails;
