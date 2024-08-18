export type User = {
  id: UserId,
  subscriptions: User[]
}

type UserId = string;
