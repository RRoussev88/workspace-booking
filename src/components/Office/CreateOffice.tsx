import CreateOfficeDialog from 'components/Office/CreateOfficeDialog';
import OfficeCard from 'components/Office/OfficeCard';
import SectionHeading from 'components/SectionHeading';
import { Office, OfficeType } from 'models/office';
import { FC, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createOffice, fetchAllOrgOffices } from 'store/officesSlice';

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
    if (newOffice) {
      await dispatch(createOffice(newOffice));
      dispatch(fetchAllOrgOffices(orgId));
    }
  };

  return (
    <section className="section__layout">
      <SectionHeading text="Create Office" />
      <hr className="divider" />
      <CreateOfficeDialog isOpen={isModalOpen} type={selectedType} onCloseModal={handleCloseModal} />
      <div className="flex flex-wrap justify-center -m-1 sm:-m-3">
        <OfficeCard title="Simple Office" onClick={() => handleCardClick(OfficeType.SIMPLE)} />
        <OfficeCard title="Named Workspaces" disabled />
        <OfficeCard title="Office Blueprint" disabled />
      </div>
    </section>
  );
};

export default CreateOffice;
