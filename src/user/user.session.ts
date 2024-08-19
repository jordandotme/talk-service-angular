import {User} from "./user";

export interface UserSession {
  get(): Promise<User>;
}

