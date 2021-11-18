import { Divider, Flex } from '@chakra-ui/react';
import { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import { CreateOrganizationDialog, OrganizationCard } from '.';
import { SectionHeading } from '..';
import { Organization, OrgType } from '../../models';
import { createOrganization, fetchAllOrganizations } from '../../store/organizationsSlice';

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
      <Divider className="divider" />
      <CreateOrganizationDialog isOpen={isModalOpen} type={selectedType} onCloseModal={handleCloseModal} />
      <Flex className="-m-1 sm:-m-3" flexWrap="wrap">
        <OrganizationCard title="Coworking Space" onClick={() => handleCardClick(OrgType.OPEN)} />
        <OrganizationCard title="Company" disabled onClick={() => handleCardClick(OrgType.CLOSED)} />
      </Flex>
    </section>
  );
};

export default CreateOrganization;
