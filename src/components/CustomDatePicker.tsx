import { FormControl, FormLabel } from '@chakra-ui/react';
import { FC } from 'react';
import DatePicker, { ReactDatePickerProps } from 'react-datepicker';
import { DATE_TIME_FORMAT } from '../models';

const CustomDatePicker: FC<ReactDatePickerProps & { label?: string; required?: boolean }> = ({
  name,
  required,
  label,
  id,
  ...props
}) => (
  <FormControl id={id ?? name} isRequired={required}>
    <FormLabel className="text-lg" htmlFor={id ?? name}>
      {label ?? name}
    </FormLabel>
    <DatePicker
      {...props}
      autoComplete="off"
      showTimeSelect
      showWeekNumbers
      showMonthDropdown
      timeIntervals={5}
      dateFormat={DATE_TIME_FORMAT}
    />
  </FormControl>
);

export default CustomDatePicker;
