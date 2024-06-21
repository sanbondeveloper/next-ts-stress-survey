type QuestionType = 'RADIO' | 'CHECKBOX' | 'INPUT';

interface Option {
  score: number;
  label: string;
}

export interface Question {
  id: number;
  type: QuestionType;
  title: string;
  options?: Option[];
}
