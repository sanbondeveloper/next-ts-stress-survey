import { useRecoilValue, useSetRecoilState } from 'recoil';
import { Question } from '@/types/question';
import { formState } from '@/store/formState';

interface Props {
  question: Question;
}

export default function RadioGroup({ question }: Props) {
  const { id, title } = question;
  const formValues = useRecoilValue(formState);
  const setFormValues = useSetRecoilState(formState);

  const handleChange = (value: string) => {
    setFormValues((prev) => ({ ...prev, [`#${id}`]: value }));
  };

  const handleKeyDown = (e: React.KeyboardEvent, value: string) => {
    if (e.key === 'Enter') {
      handleChange(value);
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
              type="radio"
              id={`${id}-${label}`}
              name={`#${id}`}
              value={`${score}-${index}`}
              onChange={() => handleChange(`${score}`)}
              checked={formValues[`#${id}`] === `${score}`}
              tabIndex={-1}
            />
            <span className="radio-custom" onClick={() => handleChange(`${score}`)}></span> <span>{label}</span>
          </label>
        </div>
      ))}
    </fieldset>
  );
}
