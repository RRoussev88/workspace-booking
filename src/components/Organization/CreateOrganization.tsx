import { SectionHeading } from 'components';
import { CreateOrganizationDialog, OrganizationCard } from 'components/Organization';
import { Organization, OrgType } from 'models';
import { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import { createOrganization, fetchAllOrganizations } from 'store/organizationsSlice';

const CreateOrganization: FC = () => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedType, setSelectedType] = useState<OrgType>(OrgType.OPEN);

  const handleCardClick = (orgType: OrgType) => {
    setSelectedType(orgType);
    setIsModalOpen(true);
  };

  const handleCloseModal = async (newOrg?: Organization) => {
    setIsModalOpen(false);
    if (newOrg) {
      await dispatch(createOrganization(newOrg));
      dispatch(fetchAllOrganizations());
    }
  };

  return (
    <section className="section__layout">
      <SectionHeading text="Create Organization" />
      <hr className="divider" />
      <CreateOrganizationDialog isOpen={isModalOpen} type={selectedType} onCloseModal={handleCloseModal} />
      <div className="flex flex-wrap justify-center -m-1 sm:-m-3">
        <OrganizationCard title="Coworking Space" onClick={() => handleCardClick(OrgType.OPEN)} />
        <OrganizationCard title="Company" disabled onClick={() => handleCardClick(OrgType.CLOSED)} />
      </div>
    </section>
  );
};

export default CreateOrganization;
