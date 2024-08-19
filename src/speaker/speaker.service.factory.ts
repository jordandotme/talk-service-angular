import {Injector} from "@angular/core";
import {HttpUserSession} from "../user/http-user.session";
import {HttpSpeakerGateway} from "./http-speaker.gateway";
import SpeakerService from "./speaker.service";

export const speakerServiceFactory = (injector: Injector) => {
  const userSession = injector.get(HttpUserSession);
  const speakerGateway = injector.get(HttpSpeakerGateway);

  return new SpeakerService(userSession, speakerGateway);
};
