import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Organization } from 'models/organization';
import SectionHeading from 'components/SectionHeading';
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
        <div>
          <p>{orgState.name}</p>
          <p>{orgState.description}</p>
        </div>
      )}
    </section>
  );
};

export default OrganizationDetails;
