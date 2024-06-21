import { fetchQuestions } from '@/util/http';

export default async function SurveyPage() {
  const questions = await fetchQuestions();

  console.log(questions);

  return <div>SurveyPage</div>;
}
