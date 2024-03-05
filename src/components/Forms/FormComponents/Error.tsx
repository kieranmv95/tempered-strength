import { ErrorMessage } from 'formik';

type ErrorProps = {
  groupName: string;
};

const FormError = ({ groupName }: ErrorProps) => (
  <ErrorMessage
    name={groupName}
    render={msg => <div className="text-xs text-red-600 mt-2">{msg}</div>}
  />
);

export default FormError;
