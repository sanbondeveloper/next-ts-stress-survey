import { Question } from '@/types/question';

export async function fetchQuestions(): Promise<Question[]> {
  const response = await fetch('http://localhost:3000/data/questions.json');

  if (!response.ok) throw new Error('Failed to Fetch Questions');

  const { data }: { data: Question[] } = await response.json();

  return data;
}
