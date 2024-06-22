import { fetchQuestions } from '@/util/http';
import SurveyForm from '@/components/survey/survey-form';

export default async function SurveyPage() {
  const questions = await fetchQuestions();

  return (
    <main className="w-[1024px] min-w-0">
      <SurveyForm questions={questions} />
    </main>
  );
}
