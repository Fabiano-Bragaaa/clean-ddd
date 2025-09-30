import {expect, it} from 'vitest'
import { AnswerQuestionUseCase } from '../answer-question';

it('should be able to answer a question', () => {
  const answerQuestionUseCase = new AnswerQuestionUseCase();

  const answer = answerQuestionUseCase.execute({
    instructorId: '1',
    questionId: '1',
    content: 'Answer to question',
  });

  expect(answer.content).toBe('Answer to question');
});