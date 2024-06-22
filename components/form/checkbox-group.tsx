import { useRecoilState } from 'recoil';
import { Question } from '@/types/question';
import { formState } from '@/store/formState';

interface Props {
  question: Question;
}

export default function CheckboxGroup({ question }: Props) {
  const { id, title } = question;
  const [formValues, setFormValues] = useRecoilState(formState);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    const formValue = (formValues[`#${id}`] as string[]) || [];
    let newFormValue;

    if (checked) {
      newFormValue = [...formValue, value];
    } else {
      newFormValue = formValue.filter((item) => item !== value);
    }

    setFormValues({ ...formValues, [`#${id}`]: newFormValue });
  };

  return (
    <fieldset className="mb-10 w-full">
      <legend className="mb-7 text-xl font-bold">{title}</legend>

      {question?.options?.map(({ label, score }) => (
        <div className="mb-3 w-fit" key={score}>
          <label htmlFor={`${id}-${label}`} className="flex items-center">
            <input type="checkbox" id={`${id}-${label}`} name={`#${id}`} value={score} onChange={handleChange} />
            <span className="checkbox-custom"></span> <span className="cursor-pointer">{label}</span>
          </label>
        </div>
      ))}
    </fieldset>
  );
}
