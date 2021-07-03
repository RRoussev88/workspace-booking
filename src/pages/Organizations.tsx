import OrganizationCard from 'components/Organization/OrganizationCard';
import CreateOrganizationDialog from 'components/Organization/CreateOrganizationDialog';
import SectionHeading from 'components/SectionHeading';
import OrgListItem from 'components/Organization/OrgListItem';
import { APIError, OrgType, Organization } from 'models/types';
import { FC, useEffect, useState } from 'react';

const Organizations: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedType, setSelectedType] = useState<OrgType | null>(null);
  const [organizations, setOrganizations] = useState<Array<Organization>>([]);

  useEffect(() => {
    fetchOrganizations();
  }, []);

  const fetchOrganizations = () => {
    fetch('http://localhost:8000/organizations', {
      method: 'GET',
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    })
      .then<{ Items?: Array<Organization>; error?: APIError }>((raw) => raw.json())
      .then((data) => {
        if (data.Items) {
          setOrganizations(data.Items);
        }
      });
  };

  const handleDelOrg = (orgId: string) => {
    fetch(`http://localhost:8000/organizations/del/${orgId}`, {
      method: 'DELETE',
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    }).then((response) => {
      if (response.ok) {
        fetchOrganizations();
      }
    });
  };

  const handleCardClick = (orgType: OrgType) => {
    setSelectedType(orgType);
    setIsModalOpen(true);
  };

  const handleCloseModal = (shouldFetch?: boolean) => {
    setIsModalOpen(false);
    if (shouldFetch) {
      fetchOrganizations();
    }
  };

  return (
    <>
      <section className="border border-gray-200 rounded sm:rounded-xl">
        <SectionHeading text="Create Organization" />
        <hr />
        <CreateOrganizationDialog isOpen={isModalOpen} type={selectedType} onCloseModal={handleCloseModal} />
        <div className="flex flex-wrap justify-center">
          <OrganizationCard title="Coworking Space" onClick={() => handleCardClick(OrgType.OPEN)} />
          <OrganizationCard title="Company" onClick={() => handleCardClick(OrgType.CLOSED)} />
        </div>
      </section>

      <section className="border border-gray-200 mt-6 rounded sm:rounded-xl">
        <SectionHeading text="Organizations List" />
        <hr />
        <div className="flex flex-col flex-wrap justify-center">
          {organizations.length ? (
            organizations.map((org) => (
              <OrgListItem key={org.id} organization={org} onDeleteOrganization={handleDelOrg} />
            ))
          ) : (
            <p className="m-2 sm:m-6 p-2 sm:p-6 border-2 border-yellow-300 rounded sm:rounded-xl m:text-lg break-all sm:break-normal font-semibold text-yellow-300">
              No Organizations available
            </p>
          )}
        </div>
      </section>
    </>
  );
};

export default Organizations;
