import {Component, Injector, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {CardModule} from "primeng/card";
import {DividerModule} from "primeng/divider";
import {NgForOf, NgIf} from "@angular/common";
import {Talk} from "./talk";
import {User} from "../user/user";
import SpeakerService from "./speaker.service";
import {ImageModule} from "primeng/image";
import {speakerServiceFactory} from "./speaker.service.factory";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CardModule, DividerModule, NgForOf, NgIf, ImageModule],
  providers: [
    {
      provide: SpeakerService,
      useFactory: speakerServiceFactory,
      deps: [Injector]
    }
  ],
  templateUrl: './speaker-profile.component.html'
})
export class SpeakerProfileComponent implements OnInit {
  isLoggedIn: boolean = true;
  talks: Talk[] = [];
  speakerProfile: User = new User('user-id-5');

  constructor(private readonly speakerService: SpeakerService) {
  }

  async ngOnInit(): Promise<void> {
    try {
      this.talks = await this.speakerService.getUpcomingTalksFor(this.speakerProfile);
    } catch (e) {
      this.isLoggedIn = false;
    }
  }
}
