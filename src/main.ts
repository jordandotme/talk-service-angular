import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { SpeakerProfileComponent } from './speaker/speaker-profile.component';
import {worker} from "./fake-http-network";
import {isDevMode} from "@angular/core";

async function prepareApp() {
  if (isDevMode()) {
    return worker.start()
  }

  return Promise.resolve()
}

prepareApp().then(() => {
  bootstrapApplication(SpeakerProfileComponent, appConfig)
    .catch((err) => console.error(err));
})



