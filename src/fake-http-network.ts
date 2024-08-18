import {http, HttpResponse} from 'msw'
import {setupWorker} from 'msw/browser'
import {User} from "./user/user";

const unauthorisedScenarios = [
  http.get('https://myapi.com/user/current', () => {
    return new HttpResponse(null, {
      status: 403
    });
  })
];

const notSubscribedScenarios = [
  http.get('https://myapi.com/user/current', () => {
    const user: User = {
      id: 'user-id-1',
      subscriptions: []
    }
    return HttpResponse.json(user);
  }),
  http.get('https://myapi.com/speaker/user-id-5/upcoming-talks', () => {
    const trips = [
      {location: "Belfast", date: "Tuesday 21 August 2024"},
      {location: "London", date: "Friday 30 August 2024"},
      {location: "Berlin", date: "Tuesday 3 September 2024"},
    ]
    return HttpResponse.json(trips);
  }),
];

const subscribedScenarios = [
  http.get('https://myapi.com/user/current', () => {
    const user: User = {
      id: 'user-id-1',
      subscriptions: [
        {id: 'user-id-5', subscriptions: []}
      ]
    }
    return HttpResponse.json(user);
  }),
  http.get('https://myapi.com/speaker/user-id-5/upcoming-talks', () => {
    const trips = [
      {location: "Belfast", date: "Tuesday 21 August 2024"},
      {location: "London", date: "Friday 30 August 2024"},
      {location: "Berlin", date: "Tuesday 3 September 2024"},
    ]
    return HttpResponse.json(trips);
  }),
];

export const worker = setupWorker(...subscribedScenarios);
