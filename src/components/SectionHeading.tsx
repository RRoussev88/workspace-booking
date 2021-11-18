import { Box, Heading } from '@chakra-ui/react';
import { FC } from 'react';

interface SectionHeadingProps {
  text: string;
}

const SectionHeading: FC<SectionHeadingProps> = ({ text }) => (
  <Box className="p-2 sm:p-6  bg-indigo-300 rounded sm:rounded-xl shadow flex">
    <Heading as="h2" size="xl" className="break-all sm:break-normal font-semibold text-gray-100">
      {text}
    </Heading>
  </Box>
);

export default SectionHeading;
