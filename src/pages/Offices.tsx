import CreateOfficeDialog from 'components/Office/CreateOfficeDialog';
import OfficeCard from 'components/Office/OfficeCard';
import SectionHeading from 'components/SectionHeading';
import { OfficeType } from 'models/types';
import { FC, useState } from 'react';

const Offices: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedType, setSelectedType] = useState<OfficeType | null>(null);

  const handleCardClick = (officeType: OfficeType) => {
    setSelectedType(officeType);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <section className="border border-gray-200 rounded sm:rounded-xl">
      <SectionHeading text="Create Office" />
      <hr />
      <CreateOfficeDialog isOpen={isModalOpen} type={selectedType} onCloseModal={handleCloseModal} />
      <div className="flex flex-wrap justify-center">
        <OfficeCard title="Simple Office" onClick={() => handleCardClick(OfficeType.SIMPLE)} />
        <OfficeCard title="Named Workspaces" disabled />
        <OfficeCard title="Office Blueprint" disabled />
      </div>
    </section>
  );
};

export default Offices;
