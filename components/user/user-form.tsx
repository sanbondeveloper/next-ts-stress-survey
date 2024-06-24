import { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { userState } from '@/store/userState';
import { isNotEmpty } from '@/util/validation';
import { useRouter } from 'next/navigation';
import Input from '@/components/common/input';

export default function UserForm() {
  const [enteredValues, setEnteredValues] = useState({
    team: '',
    name: '',
  });
  const setUser = useSetRecoilState(userState);
  const router = useRouter();

  const isValid = isNotEmpty(enteredValues.team) && isNotEmpty(enteredValues.name);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEnteredValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isValid) return;

    setUser(enteredValues);
    router.push('/survey');
  };

  return (
    <main className="w-[1024px] min-w-0">
      <form onSubmit={handleSubmit}>
        <header className="mb-10 flex w-full flex-col items-center px-4">
          <h1 className="text-4xl font-bold text-white">스트레스 자가진단</h1>
          <p>
            최근 1개월 동안 당신이 느끼고 생각한 것에 대한 것입니다. 각 문항에 해당하는 내용을 얼마나 자주 느꼈는지
            표기해 주십시오.
          </p>
        </header>

        <Input
          type="text"
          label=""
          id="team"
          name="team"
          placeholder="팀을 입력하세요."
          value={enteredValues.team}
          onChange={handleInputChange}
        />

        <Input
          type="text"
          label=""
          id="name"
          name="name"
          placeholder="이름을 입력하세요."
          value={enteredValues.name}
          onChange={handleInputChange}
        />

        <div className="mt-8 flex w-full justify-center px-4">
          <button disabled={!isValid}>설문 시작하기</button>
        </div>
      </form>
    </main>
  );
}
