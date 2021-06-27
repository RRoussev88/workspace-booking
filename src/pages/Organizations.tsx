import OrganizationCard from 'components/Organization/OrganizationCard';
import CreateOrganizationDialog from 'components/Organization/CreateOrganizationDialog';
import SectionHeading from 'components/SectionHeading';
import { OrgType } from 'models/types';
import { FC, useState } from 'react';

const Organizations: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedType, setSelectedType] = useState<OrgType | null>(null);

  const handleCardClick = (orgType: OrgType) => {
    setSelectedType(orgType);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <section className="border border-gray-200 rounded sm:rounded-xl">
      <SectionHeading text="Create Organization" />
      <hr></hr>
      <CreateOrganizationDialog isOpen={isModalOpen} type={selectedType} onCloseModal={handleCloseModal} />
      <div className="flex flex-wrap justify-center">
        <OrganizationCard title="Coworking Space" onClick={() => handleCardClick(OrgType.OPEN)} />
        <OrganizationCard title="Company" onClick={() => handleCardClick(OrgType.CLOSED)} />
      </div>
    </section>
  );
};

export default Organizations;
