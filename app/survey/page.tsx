import { fetchQuestions } from '@/util/http';
import SurveyForm from '@/components/survey/survey-form';

export default async function SurveyPage() {
  const questions = await fetchQuestions();

  return (
    <main>
      <SurveyForm questions={questions} />
    </main>
  );
}
