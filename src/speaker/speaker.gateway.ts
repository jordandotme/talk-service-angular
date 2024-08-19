import {Talk} from "./talk";
import {Speaker} from "./speaker";

export interface SpeakerGateway {
  getUpcomingTalksFor(speaker: Speaker): Promise<Talk[]>
}

