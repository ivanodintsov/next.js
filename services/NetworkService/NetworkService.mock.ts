import MockAdapter from 'axios-mock-adapter';
import { NetworkService } from './NetworkService';

export class NetworkServiceMock extends NetworkService {
  mock: MockAdapter;

  constructor(config) {
    super(config);
    this.createMock();
  }

  createMock() {
    this.mock = new MockAdapter(this.http, { onNoMatch: 'passthrough' });

    this.mock.onGet('/faq').reply(200, [
      {
        question: 'Название вопроса',
        answer:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eget tincidunt tempor, amet, sit vitae. Massa neque, risus imperdiet lacus lacus. Aliquam ut justo vestibulum, laoreet vitae tristique. Massa que, risus imperdiet lacus lacus.',
      },
      {
        question: 'Название вопроса',
        answer: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eget tincidunt tempor, amet, sit vitae. Massa neque, risus imperdiet lacus lacus. Aliquam ut justo vestibulum, laoreet vitae tristique. Massa que, risus imperdiet lacus lacus.`,
      },
      {
        question: 'Название вопроса',
        answer: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eget tincidunt tempor, amet, sit vitae. Massa neque, risus imperdiet lacus lacus. Aliquam ut justo vestibulum, laoreet vitae tristique. Massa que, risus imperdiet lacus lacus.
      `,
        beaver: true,
      },
      {
        question: 'Название вопроса',
        answer: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eget tincidunt tempor, amet, sit vitae. Massa neque, risus imperdiet lacus lacus. Aliquam ut justo vestibulum, laoreet vitae tristique. Massa que, risus imperdiet lacus lacus.`,
      },
      {
        question: 'Название вопроса',
        answer: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eget tincidunt tempor, amet, sit vitae. Massa neque, risus imperdiet lacus lacus. Aliquam ut justo vestibulum, laoreet vitae tristique. Massa que, risus imperdiet lacus lacus.`,
      },
      {
        question: 'Название вопроса',
        answer: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eget tincidunt tempor, amet, sit vitae. Massa neque, risus imperdiet lacus lacus. Aliquam ut justo vestibulum, laoreet vitae tristique. Massa que, risus imperdiet lacus lacus.`,
      },
      {
        question: 'Название вопроса',
        answer: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eget tincidunt tempor, amet, sit vitae. Massa neque, risus imperdiet lacus lacus. Aliquam ut justo vestibulum, laoreet vitae tristique. Massa que, risus imperdiet lacus lacus.`,
      },
      {
        question: 'Название вопроса',
        answer: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eget tincidunt tempor, amet, sit vitae. Massa neque, risus imperdiet lacus lacus. Aliquam ut justo vestibulum, laoreet vitae tristique. Massa que, risus imperdiet lacus lacus.`,
      },
      {
        question: 'Название вопроса',
        answer: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eget tincidunt tempor, amet, sit vitae. Massa neque, risus imperdiet lacus lacus. Aliquam ut justo vestibulum, laoreet vitae tristique. Massa que, risus imperdiet lacus lacus.`,
      },
      {
        question: 'Название вопроса',
        answer: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eget tincidunt tempor, amet, sit vitae. Massa neque, risus imperdiet lacus lacus. Aliquam ut justo vestibulum, laoreet vitae tristique. Massa que, risus imperdiet lacus lacus.`,
      },
      {
        question: 'Название вопроса',
        answer: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eget tincidunt tempor, amet, sit vitae. Massa neque, risus imperdiet lacus lacus. Aliquam ut justo vestibulum, laoreet vitae tristique. Massa que, risus imperdiet lacus lacus.`,
      },
      {
        question: 'Название вопроса',
        answer: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eget tincidunt tempor, amet, sit vitae. Massa neque, risus imperdiet lacus lacus. Aliquam ut justo vestibulum, laoreet vitae tristique. Massa que, risus imperdiet lacus lacus.`,
      },
      {
        question: 'Название вопроса',
        answer: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eget tincidunt tempor, amet, sit vitae. Massa neque, risus imperdiet lacus lacus. Aliquam ut justo vestibulum, laoreet vitae tristique. Massa que, risus imperdiet lacus lacus.`,
      },
      {
        question: 'Название вопроса',
        answer: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eget tincidunt tempor, amet, sit vitae. Massa neque, risus imperdiet lacus lacus. Aliquam ut justo vestibulum, laoreet vitae tristique. Massa que, risus imperdiet lacus lacus.`,
      },
      {
        question: 'Название вопроса',
        answer: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eget tincidunt tempor, amet, sit vitae. Massa neque, risus imperdiet lacus lacus. Aliquam ut justo vestibulum, laoreet vitae tristique. Massa que, risus imperdiet lacus lacus.`,
      },
      {
        question: 'Название вопроса',
        answer: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eget tincidunt tempor, amet, sit vitae. Massa neque, risus imperdiet lacus lacus. Aliquam ut justo vestibulum, laoreet vitae tristique. Massa que, risus imperdiet lacus lacus.`,
      },
      {
        question: 'Название вопроса',
        answer: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eget tincidunt tempor, amet, sit vitae. Massa neque, risus imperdiet lacus lacus. Aliquam ut justo vestibulum, laoreet vitae tristique. Massa que, risus imperdiet lacus lacus.`,
      },
      {
        question: 'Название вопроса',
        answer: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eget tincidunt tempor, amet, sit vitae. Massa neque, risus imperdiet lacus lacus. Aliquam ut justo vestibulum, laoreet vitae tristique. Massa que, risus imperdiet lacus lacus.`,
      },
    ]);
  }
}
