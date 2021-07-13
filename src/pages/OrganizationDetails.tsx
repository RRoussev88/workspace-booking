import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Organization, OrgType } from 'models/organization';
import SectionHeading from 'components/SectionHeading';
import CustomFormInput from 'components/CustomFormInput';
import { selectOrganizationsState, fetchOrganization } from 'store/organizationsSlice';

const OrganizationDetails: FC = () => {
  const dispatch = useDispatch();
  const { orgId } = useParams();
  const { activeOrganization } = useSelector(selectOrganizationsState);
  const [orgState, setOrgState] = useState<Organization | null>(activeOrganization);

  useEffect(() => {
    dispatch(fetchOrganization(orgId));
  }, [orgId]);

  useEffect(() => {
    setOrgState(activeOrganization);
  }, [activeOrganization]);

  return (
    <section className="section__layout">
      <SectionHeading text="Organization Details" />
      <hr />
      {orgState && (
        <dl className="m-2 sm:m-6 text-gray-600">
          <dt className="text-lg underline">Name</dt>
          <dd>{orgState.name}</dd>
          <dt className="mt-2 sm:mt-6 text-lg underline">Description</dt>
          <dd>{orgState.description}</dd>
          <dt className="mt-2 sm:mt-6 text-lg underline">Type</dt>
          <dd>{orgState.type === OrgType.OPEN ? 'Coworking Space' : 'Company'}</dd>
          <dt className="mt-2 sm:mt-6 text-lg underline">Contact</dt>
          <dd>{orgState.contact}</dd>
          <dt className="mt-2 sm:mt-6 text-lg underline">Participants</dt>
          <dd>{orgState.participants}</dd>
          <dt className="mt-2 sm:mt-6 text-lg underline">Offices</dt>
          <dd>{orgState.offices}</dd>
        </dl>
      )}
    </section>
  );
};

export default OrganizationDetails;
