import {TestBed} from "@angular/core/testing";
import {provideHttpClient} from "@angular/common/http";
import {HttpSpeakerGateway} from "./http-speaker.gateway";
import {http, HttpResponse} from 'msw'
import {SetupWorker, setupWorker} from 'msw/browser'
import {User} from "../user/user";
describe('http speaker gateway should', () => {
  const Speaker: User = new User('user-id-1');
  const TalkInBelfast = {location: "Belfast", date: "Tuesday 21 August 2024"};

  let worker: SetupWorker;
  let gateway: HttpSpeakerGateway;

  beforeAll(async () => {
    worker = setupWorker();
    await worker.start();
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient()
      ]
    });
    gateway = TestBed.inject(HttpSpeakerGateway);
  })

  afterEach(() => {
    worker.resetHandlers();
  });

  afterAll(() => {
    worker.stop();
  })

  it('provide upcoming talks for speaker', async () => {
    const handler = http.get('https://myapi.com/speaker/user-id-1/upcoming-talks', () => {
      const talks = [TalkInBelfast]
      return HttpResponse.json(talks);
    });
    worker.use(handler);

    const talks = await gateway.getUpcomingTalksFor(Speaker);

    expect(talks).toEqual([TalkInBelfast]);
  });
});
