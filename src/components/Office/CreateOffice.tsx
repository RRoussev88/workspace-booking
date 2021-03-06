import { Divider, Flex } from '@chakra-ui/react';
import { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { CreateOfficeDialog, OfficeCard } from '.';
import { SectionHeading } from '..';
import { Office, OfficeType } from '../../models';
import { createOffice, fetchAllOrgOffices } from '../../store/officesSlice';

const CreateOffice: FC = () => {
  const { orgId } = useParams();
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedType, setSelectedType] = useState<OfficeType>(OfficeType.SIMPLE);

  const handleCardClick = (officeType: OfficeType) => {
    setSelectedType(officeType);
    setIsModalOpen(true);
  };

  const handleCloseModal = async (newOffice?: Office) => {
    setIsModalOpen(false);
    if (newOffice && orgId) {
      await dispatch(createOffice(newOffice));
      dispatch(fetchAllOrgOffices(orgId));
    }
  };

  return (
    <section className="section__layout">
      <SectionHeading text="Create Office" />
      <Divider className="divider" />
      <CreateOfficeDialog isOpen={isModalOpen} type={selectedType} onCloseModal={handleCloseModal} />
      <Flex className="-m-1 sm:-m-3" flexWrap="wrap">
        <OfficeCard title="Simple Office" onClick={() => handleCardClick(OfficeType.SIMPLE)} />
        <OfficeCard title="Named Workspaces" disabled />
        <OfficeCard title="Office Blueprint" disabled />
      </Flex>
    </section>
  );
};

export default CreateOffice;
