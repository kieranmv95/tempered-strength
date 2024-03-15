import { Field } from 'formik';

export type SelectOption = {
  key: string;
  value: string;
};

export const selectFieldInitialValues = <T extends string>(
  groupName: T,
  defaultOption: SelectOption,
): { [P in T]: string } => {
  return {
    [groupName]: defaultOption.key,
  } as { [P in T]: string };
};

type SelectFieldProps = {
  id: string;
  groupName: string;
  options: SelectOption[];
};

const SelectField = ({ id, groupName, options }: SelectFieldProps) => (
  <Field
    id={id}
    as="select"
    name={groupName}
    className="text-sm rounded block w-full p-2.5 bg-rand-500 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 h-[40px]"
  >
    {options.map(option => (
      <option key={option.key} value={option.key}>
        {option.value}
      </option>
    ))}
  </Field>
);

export default SelectField;
