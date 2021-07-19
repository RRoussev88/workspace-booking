import { AuthContext } from 'authContext';
import AppMessage from 'components/AppMessage';
import CustomFormInput from 'components/CustomFormInput';
import CustomTextArea from 'components/CustomTextArea';
import Loader from 'components/Loader';
import SectionHeading from 'components/SectionHeading';
import { Organization, OrgType } from 'models/organization';
import { AppMessageVariant } from 'models/types';
import { ChangeEvent, ChangeEventHandler, FC, useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchOrganization, resetState, selectOrganizationsState } from 'store/organizationsSlice';

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
    dispatch(fetchOrganization(orgId));

    return () => {
      dispatch(resetState());
    };
  }, [orgId]);

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
          <dd>{`This organization has ${orgState.offices.length || 'no'} offices`}</dd>
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
                onClick={() => setInEditMode((prevState) => !prevState)}
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
