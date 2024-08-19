import {TestBed} from "@angular/core/testing";
import {provideHttpClient} from "@angular/common/http";
import {http, HttpResponse} from 'msw'
import {SetupWorker, setupWorker} from 'msw/browser'
import {Guest, User} from "./user";
import {HttpUserSession, UserResponse} from "./http-user.session";

describe('http user session should', () => {
  const OtherUser = new User('user-id-1');
  const UserWithSubscriptions = new User('user-id-2', [OtherUser]);

  let worker: SetupWorker;
  let session: HttpUserSession;

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
    session = TestBed.inject(HttpUserSession);
  })

  afterEach(() => {
    worker.resetHandlers();
  });

  afterAll(() => {
    worker.stop();
  })

  it('provide guest when getting user session fails', async () => {
    const handler = http.get('https://myapi.com/user/current', () => {
      return new HttpResponse(null, {
        status: 403
      });
    });
    worker.use(handler);

    const user = await session.get();

    expect(user).toEqual(new Guest());
  });

  it('provide guest when getting user session fails', async () => {
    const handler = http.get('https://myapi.com/user/current', () => {
      const user: UserResponse = {
        id: 'user-id-2',
        subscriptions: [
          {id: 'user-id-1', subscriptions: []}
        ]
      }
      return HttpResponse.json(user);
    });
    worker.use(handler);

    const user = await session.get();

    expect(user).toEqual(UserWithSubscriptions);
  });
});
