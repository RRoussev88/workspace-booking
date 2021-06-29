import OrganizationCard from 'components/Organization/OrganizationCard';
import CreateOrganizationDialog from 'components/Organization/CreateOrganizationDialog';
import SectionHeading from 'components/SectionHeading';
import { OrgType, Organization } from 'models/types';
import { FC, useEffect, useState } from 'react';

const Organizations: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedType, setSelectedType] = useState<OrgType | null>(null);
  const [organizations, setOrganizations] = useState<Array<Organization>>([]);

  useEffect(() => {
    fetch('http://localhost:8000/organizations', {
      method: 'GET',
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    }).then<{ organizations?: Array<Organization>; errors?: string[] }>((raw) => raw.json());
  }, []);

  const handleCardClick = (orgType: OrgType) => {
    setSelectedType(orgType);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
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
        <div className="flex flex-wrap justify-center">org list</div>
      </section>
    </>
  );
};

export default Organizations;
