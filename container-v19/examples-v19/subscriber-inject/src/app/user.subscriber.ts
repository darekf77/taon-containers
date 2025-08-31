import { Taon } from "taon/src";
import { User } from "./user";

@Taon.Subscriber({
  className: 'UserSubscriber',
})
export class UserSubscriber extends Taon.Base.SubscriberForEntity<User> {

  listenTo() {
    return User;
  }

  customEvent() {
    console.log('CUSTOM EVENT');
  }
}

