import { useSetRecoilState } from 'recoil';
import { Question } from '@/types/question';
import { formState } from '@/store/formState';

interface Props {
  question: Question;
}

export default function RadioGroup({ question }: Props) {
  const { id, title } = question;
  const setFormValues = useSetRecoilState(formState);

  const handleChange = (value: string) => {
    setFormValues((prev) => ({ ...prev, [`#${id}`]: value }));
  };

  return (
    <fieldset className="mb-10 w-full">
      <legend className="mb-7 text-xl font-bold">{title}</legend>

      {question?.options?.map(({ label, score }, index) => (
        <div className="mb-3 w-fit" key={score}>
          <label htmlFor={`${id}-${label}`} className="flex items-center">
            <input
              type="radio"
              id={`${id}-${label}`}
              name={`#${id}`}
              value={`${score}-${index}`}
              onChange={() => handleChange(`${score}`)}
            />
            <span className="radio-custom"></span> <span className="cursor-pointer">{label}</span>
          </label>
        </div>
      ))}
    </fieldset>
  );
}
