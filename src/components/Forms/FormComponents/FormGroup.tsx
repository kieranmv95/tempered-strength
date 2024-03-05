import Label from '@/components/Forms/FormComponents/Label';
import FormError from '@/components/Forms/FormComponents/Error';

type FormGroupProps = {
  label?: string;
  id: string;
  groupName: string;
  children: React.ReactNode;
};

const FormGroup = ({ label, id, groupName, children }: FormGroupProps) => (
  <div>
    {label && <Label htmlFor={id}>{label}</Label>}
    {children}
    <FormError groupName={groupName} />
  </div>
);

export default FormGroup;
