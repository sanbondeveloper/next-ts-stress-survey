import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDialogStore } from '@/store/dialogState';
import { authenticate } from '@/util/actions';
import Input from '../common/input';
import { isEmail, isNotEmpty } from '@/util/validation';

export default function AuthForm() {
  const [enteredValues, setEnteredValues] = useState({
    email: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();
  const { close } = useDialogStore();

  const isValid = isNotEmpty(enteredValues.email) && isEmail(enteredValues.email) && isNotEmpty(enteredValues.password);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEnteredValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCancel = () => {
    close();
    router.replace('/');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setErrorMessage(null);
    const isSuccess = await authenticate({ email: enteredValues.email, password: enteredValues.password });

    if (!isSuccess) {
      setErrorMessage('인증에 실패했습니다.');
      return;
    }

    close();
    router.replace('/dashboard');
  };

  return (
    <form onSubmit={handleSubmit}>
      <p className="mb-5">대시보드 페이지로 이동하려면 권한이 필요합니다.</p>

      <Input
        type="email"
        label="이메일"
        id="email"
        name="email"
        placeholder="이메일을 입력하세요."
        value={enteredValues.email}
        onChange={handleInputChange}
      />
      <Input
        type="password"
        label="비밀번호"
        id="password"
        name="password"
        placeholder="비밀번호를 입력하세요."
        value={enteredValues.password}
        onChange={handleInputChange}
      />

      <p className="flex h-2 justify-center text-red-500">{errorMessage && errorMessage}</p>
      <div className="mt-10 flex justify-center">
        <button type="button" onClick={handleCancel}>
          취소
        </button>
        <button className="ml-10" disabled={!isValid}>
          확인
        </button>
      </div>
    </form>
  );
}
