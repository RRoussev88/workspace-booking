import CreateOfficeDialog from 'components/Office/CreateOfficeDialog';
import OfficeCard from 'components/Office/OfficeCard';
import SectionHeading from 'components/SectionHeading';
import { OfficeType } from 'models/types';
import { FC, useState } from 'react';

interface OfficesProps {}

const Offices: FC<OfficesProps> = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedType, setSelectedType] = useState<OfficeType | null>(null);

  const handleSimpleOfficeClick = () => {
    setSelectedType(OfficeType.SIMPLE);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <section className="border border-gray-200 rounded-xl">
      <SectionHeading text="Create Office" />
      <CreateOfficeDialog isOpen={isModalOpen} type={selectedType} onCloseModal={handleCloseModal} />
      <div className="flex flex-wrap">
        <OfficeCard title="Simple Office" onClick={handleSimpleOfficeClick} />
        <OfficeCard title="Named Workspaces" disabled />
        <OfficeCard title="Office Blueprint" disabled />
      </div>
    </section>
  );
};

export default Offices;
