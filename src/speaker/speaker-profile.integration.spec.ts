import {setupWorker, SetupWorker} from "msw/browser";
import {http, HttpResponse} from "msw";
import {UserResponse} from "../user/http-user.session";
import {provideHttpClient} from "@angular/common/http";
import {render, screen} from "@testing-library/angular";
import {SpeakerProfileComponent} from "./speaker-profile.component";

describe('speaker profile integration should', () => {
  const SubscribedScenarios = [
    http.get('https://myapi.com/user/current', () => {
      const user: UserResponse = {
        id: 'user-id-1',
        subscriptions: [
          {id: 'user-id-5', subscriptions: []}
        ]
      }
      return HttpResponse.json(user);
    }),
    http.get('https://myapi.com/speaker/user-id-5/upcoming-talks', () => {
      const talks = [
        {location: "Belfast", date: "Tuesday 20 August 2024"},
        {location: "London", date: "Friday 30 August 2024"},
        {location: "Berlin", date: "Tuesday 3 September 2024"},
      ]
      return HttpResponse.json(talks);
    }),
  ];

  let worker: SetupWorker;

  beforeAll(async () => {
    worker = setupWorker(...SubscribedScenarios);
    await worker.start();
  });

  beforeEach(async () => {
    await renderComponent();
  })

  afterEach(() => {
    worker.resetHandlers();
  });

  afterAll(() => {
    worker.stop();
  })

  it('shows upcoming talks', async () => {
    expect(await screen.findByText(/Belfast @ Tuesday 20 August 2024/)).toBeTruthy();
    expect(await screen.findByText(/London @ Friday 30 August 2024/)).toBeTruthy();
    expect(await screen.findByText(/Berlin @ Tuesday 3 September 2024/)).toBeTruthy();
  });

  const renderComponent = async () => {
    await render(SpeakerProfileComponent, {
      providers: [provideHttpClient()],
    });
  };
});
