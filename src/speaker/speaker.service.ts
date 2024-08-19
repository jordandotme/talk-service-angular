import {Talk} from "./talk";
import {Inject, Injectable} from "@angular/core";
import {UserSession} from "../user/user.session";
import {SpeakerGateway} from "./speaker.gateway";
import {Speaker} from "./speaker";

export class SpeakerService {
  constructor(private userSession: UserSession, private speakerGateway: SpeakerGateway) {
  }

  public async getUpcomingTalksFor(speaker: Speaker): Promise<Talk[]> {
    const user = await this.userSession.get();
    return user.isSubscribedTo(speaker)
      ? await this.speakerGateway.getUpcomingTalksFor(speaker)
      : [];
  }
}

export default SpeakerService
