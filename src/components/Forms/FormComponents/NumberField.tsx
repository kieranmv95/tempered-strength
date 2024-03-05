import { Field } from 'formik';
import * as Yup from 'yup';
import { getCurrentDate } from '@/helpers/getCurrentDate';

export const numberFieldSchema = (groupName: string) => ({
  [groupName]: Yup.number().required('Number is required'),
});

export const numberFieldInitialValues = <T extends string>(
  groupName: T,
): { [P in T]: string } => {
  return {
    [groupName]: '',
  } as { [P in T]: string };
};

type NumberFieldProps = {
  id: string;
  groupName: string;
};

const NumberField = ({ id, groupName }: NumberFieldProps) => (
  <Field
    id={id}
    type="number"
    name={groupName}
    inputMode="decimal"
    placeholder="100"
    autoComplete="off"
    className="text-sm rounded block w-full p-2.5 bg-zinc-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
  />
);

export default NumberField;
