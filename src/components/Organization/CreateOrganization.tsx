import CreateOrganizationDialog from 'components/Organization/CreateOrganizationDialog';
import OrganizationCard from 'components/Organization/OrganizationCard';
import SectionHeading from 'components/SectionHeading';
import { OrgType } from 'models/organization';
import { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchAllOrganizations } from 'store/organizationsSlice';
 
const CreateOrganization: FC = () => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedType, setSelectedType] = useState<OrgType>(OrgType.OPEN);

  const handleCardClick = (orgType: OrgType) => {
    setSelectedType(orgType);
    setIsModalOpen(true);
  };

  const handleCloseModal = (shouldFetch?: boolean) => {
    setIsModalOpen(false);
    if (shouldFetch) {
      dispatch(fetchAllOrganizations());
    }
  };

  return ( 
    <section className="section__layout">
        <SectionHeading text="Create Organization" />
        <hr />
        <CreateOrganizationDialog isOpen={isModalOpen} type={selectedType} onCloseModal={handleCloseModal} />
        <div className="flex flex-wrap justify-center">
          <OrganizationCard title="Coworking Space" onClick={() => handleCardClick(OrgType.OPEN)} />
          <OrganizationCard title="Company" onClick={() => handleCardClick(OrgType.CLOSED)} />
        </div>
      </section>
   );
}
 
export default CreateOrganization;