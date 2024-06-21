interface Props {
  label: string;
  id: string;
  name: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Input({ label, id, ...props }: Props) {
  return (
    <div className="mb-2 px-4">
      <label htmlFor={id}>{label}</label>
      <input type="text" id={id} {...props} />
    </div>
  );
}
