import { isEqual } from 'lodash';
import { ChangeEvent, ChangeEventHandler, FC, useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { AuthContext } from '../authContext';
import { AppMessage, CustomFormInput, CustomTextArea, Loader, SectionHeading } from '../components';
import { AppMessageVariant, Office, OfficeType } from '../models';
import { fetchOffice, resetState, selectOfficesState, setActiveOffice, updateOffice } from '../store/officesSlice';
import { fetchOrganization, resetState as resetOrgState, selectOrganizationsState } from '../store/organizationsSlice';

const OfficeDetails: FC = () => {
  const auth = useContext(AuthContext);
  const dispatch = useDispatch();
  const { orgId, officeId } = useParams();
  const { activeOffice, error, isLoading } = useSelector(selectOfficesState);
  const { activeOrganization, error: orgError, isLoading: isLoadingOrg } = useSelector(selectOrganizationsState);
  const [officeState, setOfficeState] = useState<Office | null>(activeOffice);
  const [inEditMode, setInEditMode] = useState<boolean>(false);

  const handleFormChange: ChangeEventHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setOfficeState((prevState) => (prevState ? { ...prevState, [event.target.name]: event.target.value } : prevState));
  };

  useEffect(() => {
    if (officeId) {
      dispatch(fetchOffice(officeId));
    }
    if (orgId) {
      dispatch(fetchOrganization(orgId));
    }

    return () => {
      dispatch(resetState());
      dispatch(resetOrgState());
    };
  }, [dispatch, officeId, orgId]);

  useEffect(() => {
    setOfficeState(activeOffice);
  }, [activeOffice]);

  return (
    <section className="section__layout flex flex-col">
      <SectionHeading
        text={`${officeState?.type === OfficeType.SIMPLE ? 'Simple Office' : 'Named Spaces Office'} Details`}
      />
      <hr className="divider" />
      {(isLoading || isLoadingOrg) && <Loader />}
      {!isLoading && !isLoadingOrg && (!!error || !!orgError) && (
        <AppMessage variant={AppMessageVariant.DANGER} text={error ?? (orgError as string)} />
      )}
      {activeOrganization && (
        <p className="my-2 sm:my-6 text-2xl break-all sm:break-normal font-medium underline text-gray-600">
          <Link to={`/organizations/${orgId}`}>Organization: {activeOrganization.name}</Link>
        </p>
      )}
      {!isLoading && !isLoadingOrg && !error && !orgError && officeState && (
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
          {inEditMode ? (
            <CustomFormInput
              name="address"
              label="Address"
              containerClasses="mt-6"
              placeholder="Enter office address"
              value={officeState.address}
              onChange={handleFormChange}
            />
          ) : (
            <>
              <dt className="mt-2 sm:mt-6 text-lg underline">Address</dt>
              <dd>{officeState.address}</dd>
            </>
          )}
          <dt className="mt-2 sm:mt-6 text-lg underline">Contact</dt>
          <dd className="truncate">
            <a href={`mailto:${officeState.contact}`} className="text-blue-500 underline">
              {officeState.contact}
            </a>
          </dd>
          <article className="flex flex-wrap">
            <div
              className={`mx-2 sm:mx-6 mt-2 sm:mt-6 p-2 sm:p-6 flex-grow flex-shrink-0 text-center text-gray-500 rounded sm:rounded-xl ${
                officeState.capacity > officeState.occupied ? 'bg-green-300' : 'bg-red-300'
              }`}
            >
              <dt className="text-lg underline">Capacity</dt>
              <dd className="text-xl">{officeState.capacity}</dd>
            </div>
            <div
              className={`mx-2 sm:mx-6 mt-2 sm:mt-6 p-2 sm:p-6 flex-grow flex-shrink-0 text-center text-gray-500 rounded sm:rounded-xl ${
                officeState.capacity > officeState.occupied ? 'bg-green-300' : 'bg-red-300'
              }`}
            >
              <dt className="text-lg underline">Occupied</dt>
              <dd className="text-xl">{officeState.occupied}</dd>
            </div>
          </article>
        </dl>
      )}
      <Link
        to="./reservations"
        className="mt-2 sm:mt-6 self-end action-button w-28 text-gray-400 bg-yellow-300 hover:bg-yellow-200"
      >
        Reservations
      </Link>
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
                disabled={
                  isLoading ||
                  isLoadingOrg ||
                  isEqual(officeState, activeOffice) ||
                  !officeState.name ||
                  !officeState.description ||
                  !officeState.address
                }
                onClick={async () => {
                  if (officeState) {
                    await dispatch(updateOffice(officeState));
                    await dispatch(setActiveOffice(officeState));
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
