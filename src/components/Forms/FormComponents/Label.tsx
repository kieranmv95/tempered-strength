type LabelProps = {
  htmlFor: string;
  children: React.ReactNode;
};
const Label = ({ children, htmlFor }: LabelProps) => (
  <label htmlFor={htmlFor} className="block mb-1 cursor-pointer">
    {children}
  </label>
);

export default Label;
