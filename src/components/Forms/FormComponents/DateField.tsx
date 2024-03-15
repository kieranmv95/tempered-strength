import { Field } from 'formik';
import * as Yup from 'yup';
import { getCurrentDate } from '@/helpers/getCurrentDate';

export const dateFieldSchema = (groupName: string) => ({
  [groupName]: Yup.date().required('Date is required'),
});

export const dateFieldInitialValues = <T extends string>(
  groupName: T,
): { [P in T]: string } => {
  return {
    [groupName]: getCurrentDate(),
  } as { [P in T]: string };
};

type DateFieldProps = {
  id: string;
  groupName: string;
};

const DateField = ({ id, groupName }: DateFieldProps) => (
  <Field
    id={id}
    type="date"
    name={groupName}
    autoComplete="off"
    placeholder="dd/mm/yyyy"
    className="text-sm rounded block w-full p-2.5 bg-rand-500 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 h-[42px]"
  />
);

export default DateField;
