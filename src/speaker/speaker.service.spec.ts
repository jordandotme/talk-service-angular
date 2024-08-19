import SpeakerService from "./speaker.service";
import {Guest, User} from "../user/user";
import {UserNotLoggedInError} from "../user/user.error";

import {FakeSpeakerGateway} from "./fake-speaker.gateway";
import {FakeUserSession} from "../user/fake-user.session";

describe('speaker service should', () => {
  const Speaker: User = new User('user-id-2');
  const OtherSpeaker: User = new User('user-id-3');
  const UserWithoutSubscriptions = new User('user-id-1');
  const UserSubscribedToSpeaker = new User('user-id-1', [Speaker]);
  const UserSubscribedToOtherSpeaker = new User('user-id-1', [OtherSpeaker]);
  const TalkInBelfast = {location: 'Belfast', date: 'Tuesday 20th August 2024'};
  const SpeakerUpcomingTalks = [TalkInBelfast];

  let userSession: FakeUserSession;
  let speakerGateway: FakeSpeakerGateway;

  let service: SpeakerService;

  beforeEach(() => {
    userSession = new FakeUserSession();
    speakerGateway = new FakeSpeakerGateway();

    service = new SpeakerService(userSession, speakerGateway);
  });

  it('blocks getting upcoming talks for guests', async () => {
    userSession.add(new Guest());

    await expectAsync(service.getUpcomingTalksFor(Speaker)).toBeRejectedWith(new UserNotLoggedInError());
  });

  it('provide no upcoming talks when user has no subscriptions', async () => {
    userSession.add(UserWithoutSubscriptions);

    const upcomingTalks = await service.getUpcomingTalksFor(Speaker);

    expect(upcomingTalks).toEqual([]);
  });

  it('provide no upcoming talks when user is not subscribed to speaker', async () => {
    userSession.add(UserSubscribedToOtherSpeaker);

    const upcomingTalks = await service.getUpcomingTalksFor(Speaker);

    expect(upcomingTalks).toEqual([]);
  });

  it('provides speakers upcoming talks when user is subscribed', async () => {
    userSession.add(UserSubscribedToSpeaker);
    speakerGateway.addTalksFor(Speaker, SpeakerUpcomingTalks);

    const upcomingTalks = await service.getUpcomingTalksFor(Speaker);

    expect(upcomingTalks).toEqual(SpeakerUpcomingTalks);
  });
});
