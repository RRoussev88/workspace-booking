import { isEqual } from 'lodash';
import { ChangeEvent, ChangeEventHandler, FC, useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { AuthContext } from '../authContext';
import { AppMessage, CustomFormInput, CustomTextArea, Loader, SectionHeading } from '../components';
import { AppMessageVariant, Organization, OrgType } from '../models';
import {
  fetchOrganization,
  resetState,
  selectOrganizationsState,
  setActiveOrganization,
  updateOrganization,
} from '../store/organizationsSlice';

const OrganizationDetails: FC = () => {
  const auth = useContext(AuthContext);
  const dispatch = useDispatch();
  const { orgId } = useParams();
  const { activeOrganization, error, isLoading } = useSelector(selectOrganizationsState);
  const [orgState, setOrgState] = useState<Organization | null>(activeOrganization);
  const [inEditMode, setInEditMode] = useState<boolean>(false);

  const handleFormChange: ChangeEventHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setOrgState((prevState) => (prevState ? { ...prevState, [event.target.name]: event.target.value } : prevState));
  };

  useEffect(() => {
    if (orgId) {
      dispatch(fetchOrganization(orgId));
    }

    return () => {
      dispatch(resetState());
    };
  }, [dispatch, orgId]);

  useEffect(() => {
    setOrgState(activeOrganization);
  }, [activeOrganization]);

  return (
    <section className="section__layout">
      <SectionHeading text={`${orgState?.type === OrgType.OPEN ? 'Coworking Space' : 'Company'} Details`} />
      <hr className="divider" />
      {isLoading && <Loader />}
      {!isLoading && !!error && <AppMessage variant={AppMessageVariant.DANGER} text={error} />}
      {!isLoading && !error && orgState && (
        <dl className="text-gray-600">
          {inEditMode ? (
            <CustomFormInput
              name="name"
              label="Name"
              placeholder="Enter organization name"
              value={orgState.name}
              onChange={handleFormChange}
            />
          ) : (
            <>
              <dt className="text-lg underline">Name</dt>
              <dd>{orgState.name}</dd>
            </>
          )}
          {inEditMode ? (
            <CustomTextArea
              name="description"
              label="Description"
              containerClasses="mt-6"
              placeholder="Enter organization description"
              value={orgState.description}
              onChange={handleFormChange}
            />
          ) : (
            <>
              <dt className="mt-2 sm:mt-6 text-lg underline">Description</dt>
              <dd>{orgState.description}</dd>
            </>
          )}
          <dt className="mt-2 sm:mt-6 text-lg underline">Contact</dt>
          <dd className="truncate">
            <a href={`mailto:${orgState.contact}`} className="text-blue-500 underline">
              {orgState.contact}
            </a>
          </dd>
          {orgState.type === OrgType.CLOSED && (
            <>
              <dt className="mt-2 sm:mt-6 text-lg underline">Participants</dt>
              <dd>{orgState.participants}</dd>
            </>
          )}
          <dt className="mt-2 sm:mt-6 text-lg underline">Offices</dt>
          <dd className="flex flex-wrap items-center justify-between">
            <span>{`This organization has ${orgState.offices.length || 'no'} offices`}</span>
            <Link
              to={`/organizations/${orgId}/offices`}
              className="action-button w-24 m-1 text-gray-400 bg-yellow-300 hover:bg-yellow-200"
            >
              Offices
            </Link>
          </dd>
        </dl>
      )}
      {!!auth.coworker?.coworkerEmail && orgState?.contact.includes(auth.coworker?.coworkerEmail) && (
        <>
          <hr className="divider" />
          {inEditMode ? (
            <div className="flex flex-wrap justify-between">
              <button
                type="button"
                className="form__button form__button__cancel"
                onClick={() => {
                  setOrgState(activeOrganization);
                  setInEditMode((prevState) => !prevState);
                }}
              >
                Cancel
              </button>
              <button
                type="button"
                className="form__button form__button__success"
                disabled={isLoading || isEqual(orgState, activeOrganization) || !orgState.name || !orgState.description}
                onClick={async () => {
                  if (orgState) {
                    await dispatch(updateOrganization(orgState));
                    await dispatch(setActiveOrganization(orgState));
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

export default OrganizationDetails;
