import { useSetRecoilState } from 'recoil';
import { Question } from '@/types/question';
import { formState } from '@/store/formState';

interface Props {
  question: Question;
}

export default function RadioGroup({ question }: Props) {
  const { id, title } = question;
  const setFormState = useSetRecoilState(formState);

  const handleChange = (score: number) => {
    setFormState((prev) => ({ ...prev, [`#${id}`]: [score] }));
  };

  return (
    <fieldset className="mb-10 w-full">
      <legend className="mb-7 text-xl font-bold">{title}</legend>

      {question?.options?.map(({ label, score }) => (
        <div className="mb-3 w-fit" key={score}>
          <label htmlFor={label} className="flex items-center">
            <input type="radio" id={label} name={`#${id}`} value={label} onChange={() => handleChange(score)} />
            <span className="radio-custom"></span> <span className="cursor-pointer">{label}</span>
          </label>
        </div>
      ))}
    </fieldset>
  );
}
