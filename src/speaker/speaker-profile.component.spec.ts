import SpeakerService from "./speaker.service";
import createSpyObj = jasmine.createSpyObj;
import {render, screen} from "@testing-library/angular";
import {SpeakerProfileComponent} from "./speaker-profile.component";
import SpyObj = jasmine.SpyObj;
import {UserNotLoggedInError} from "../user/user.error";
import {provideHttpClient} from "@angular/common/http";
import {TestBed} from "@angular/core/testing";

describe('speaker profile should', () => {
  let speakerService: SpyObj<SpeakerService>;

  beforeEach(() => {
    speakerService = createSpyObj(['getUpcomingTalksFor']);
  });

  it('prompt user to log in when getting upcoming talks fails', async () => {
    speakerService.getUpcomingTalksFor.and.rejectWith(new UserNotLoggedInError());

    await renderComponent();

    expect(await screen.findByText(/Login to see talks/)).toBeTruthy()
  });

  it('prompt user to log in when getting upcoming talks fails', async () => {
    speakerService.getUpcomingTalksFor.and.resolveTo([{location: 'Belfast', date: 'Tuesday 20th August 2024'}]);

    await renderComponent();

    expect(await screen.findByText(/Belfast @ Tuesday 20th August 2024/)).toBeTruthy();
  });

  const renderComponent = async () => {
    TestBed.overrideProvider(SpeakerService, {useValue: speakerService});

    await render(SpeakerProfileComponent, {
      providers: [provideHttpClient()],
    });
  };
});
