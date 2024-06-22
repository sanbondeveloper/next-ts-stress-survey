import { Question } from '@/types/question';
import { useRecoilState } from 'recoil';
import { formState } from '@/store/formState';

interface Props {
  question: Question;
}

export default function SubjectiveInput({ question }: Props) {
  const { id, title } = question;
  const [formValues, setFormValues] = useRecoilState(formState);

  const inputValue = (formValues[`#${id}`] as string) || '';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { value } = e.target;

    if (value !== '' && value.replace(/0/g, '') === '') return;
    else if (value !== '' && Number(value) > 10) value = '10';

    setFormValues((prev) => ({ ...prev, [`#${id}`]: value }));
  };

  return (
    <>
      <div className="mb-7 text-xl font-bold">{title}</div>
      <input
        type="number"
        placeholder="숫자를 입력하세요"
        min={1}
        max={10}
        value={inputValue}
        onChange={handleChange}
      />
    </>
  );
}
