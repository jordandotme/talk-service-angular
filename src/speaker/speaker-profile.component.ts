import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {CardModule} from "primeng/card";
import {DividerModule} from "primeng/divider";
import {NgForOf, NgIf} from "@angular/common";
import {Talk} from "./talk";
import {User} from "../user/user";
import SpeakerService from "./speaker.service";
import {ImageModule} from "primeng/image";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CardModule, DividerModule, NgForOf, NgIf, ImageModule],
  templateUrl: './speaker-profile.component.html'
})
export class SpeakerProfileComponent implements OnInit {
  isLoggedIn: boolean = true;
  talks: Talk[] = [];
  speakerProfile: User = {
    id: 'user-id-5',
    subscriptions: []
  }

  constructor(private readonly speakerService: SpeakerService) {
  }

  async ngOnInit(): Promise<void> {
    try {
      this.talks = await this.speakerService.getTalks(this.speakerProfile);
    } catch (e) {
      this.isLoggedIn = false;
    }
  }

}
