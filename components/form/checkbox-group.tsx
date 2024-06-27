import { useRecoilState } from 'recoil';
import { Question } from '@/types/question';
import { formState } from '@/store/formState';

interface Props {
  question: Question;
}

export default function CheckboxGroup({ question }: Props) {
  const { id, title } = question;
  const [formValues, setFormValues] = useRecoilState(formState);

  const handleChange = (checked: boolean, value: string) => {
    const formValue = (formValues[`#${id}`] as string[]) || [];
    let newFormValue;

    if (checked) {
      newFormValue = [...formValue, value];
    } else {
      newFormValue = formValue.filter((item) => item !== value);
    }

    setFormValues({ ...formValues, [`#${id}`]: newFormValue });
  };

  const handleKeyDown = (e: React.KeyboardEvent, value: string) => {
    if (e.key === 'Enter') {
      handleChange(!formValues[`#${id}`]?.includes(value), value);
    }
  };

  return (
    <fieldset className="mb-10 w-full">
      <legend className="mb-7 text-xl font-bold">{title}</legend>

      {question?.options?.map(({ label, score }, index) => (
        <div className="mb-3 w-fit" key={score}>
          <label
            htmlFor={`${id}-${label}`}
            className="flex cursor-pointer items-center"
            tabIndex={0}
            onKeyDown={(e) => handleKeyDown(e, `${score}`)}
          >
            <input
              type="checkbox"
              id={`${id}-${label}`}
              name={`#${id}`}
              value={`${score}-${index}`}
              onChange={(e) => handleChange(e.target.checked, `${score}`)}
              checked={formValues[`#${id}`]?.includes(`${score}`) || false}
              tabIndex={-1}
            />
            <span className="checkbox-custom"></span> <span className="cursor-pointer">{label}</span>
          </label>
        </div>
      ))}
    </fieldset>
  );
}
