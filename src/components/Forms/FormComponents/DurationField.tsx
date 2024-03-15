import { Field } from 'formik';
import * as Yup from 'yup';

export const durationFieldSchema = (groupName: string) => {
  return {
    [groupName]: Yup.object()
      .shape({
        HH: Yup.string(),
        MM: Yup.string(),
        SS: Yup.string(),
      })
      .test(
        'duration-validation',
        'At least one field must be provided',
        function (value) {
          const { HH, MM, SS } = value;
          return HH !== '00' || MM !== '00' || SS !== '00';
        },
      ),
  };
};

export const durationFieldInitialValues = <T extends string>(
  groupName: T,
): { [P in T]: { HH: string; MM: string; SS: string } } => {
  return {
    [groupName]: {
      HH: '00',
      MM: '00',
      SS: '00',
    },
  } as { [P in T]: { HH: string; MM: string; SS: string } };
};

type DurationFieldProps = {
  id: string;
  groupName: string;
};

const DurationField = ({ id, groupName }: DurationFieldProps) => (
  <div className="flex items-center">
    <Field
      id={id}
      as="select"
      name={`${groupName}.HH`}
      placeholder="HH"
      className="text-sm rounded block w-full p-2.5 bg-rand-500 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 h-[40px]"
    >
      {Array.from({ length: 24 }).map((_, i) => {
        return (
          <option
            key={i.toString().padStart(2, '0')}
            value={i.toString().padStart(2, '0')}
          >
            {i.toString().padStart(2, '0')}
          </option>
        );
      })}
    </Field>
    <div className="text-2xl font-light px-1">:</div>
    <Field
      as="select"
      name={`${groupName}.MM`}
      placeholder="MM"
      className="text-sm rounded block w-full p-2.5 bg-rand-500 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 h-[40px]"
    >
      {Array.from({ length: 60 }).map((_, i) => {
        return (
          <option
            key={i.toString().padStart(2, '0')}
            value={i.toString().padStart(2, '0')}
          >
            {i.toString().padStart(2, '0')}
          </option>
        );
      })}
    </Field>
    <div className="text-2xl font-light px-1">:</div>
    <Field
      as="select"
      name={`${groupName}.SS`}
      placeholder="MM"
      className="text-sm rounded block w-full p-2.5 bg-rand-500 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 h-[40px]"
    >
      {Array.from({ length: 60 }).map((_, i) => {
        return (
          <option
            key={i.toString().padStart(2, '0')}
            value={i.toString().padStart(2, '0')}
          >
            {i.toString().padStart(2, '0')}
          </option>
        );
      })}
    </Field>
  </div>
);

export default DurationField;
