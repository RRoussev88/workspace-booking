import { FC, useState } from 'react';
import SectionHeading from 'components/SectionHeading';
import OfficeCard from 'components/Office/OfficeCard';
import CreateOfficeDialog from 'components/Office/CreateOfficeDialog';
import { OfficeType } from 'models/types';

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
    <main>
      <section className="border border-gray-200 rounded-xl">
        <SectionHeading text="Create Office" />
        <CreateOfficeDialog isOpen={isModalOpen} type={selectedType} onCloseModal={handleCloseModal} />
        <div className="flex flex-wrap">
          <OfficeCard title="Simple Office" onClick={handleSimpleOfficeClick} />
          <OfficeCard title="Named Workspaces" disabled />
          <OfficeCard title="Office Blueprint" disabled />
        </div>
      </section>
    </main>
  );
};

export default Offices;
