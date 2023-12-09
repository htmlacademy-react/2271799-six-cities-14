import { AuthorizationStatus, RequestStatus } from '../../const';
import { UserType } from '../user';

export type UsersType = {
  authorizationStatus: AuthorizationStatus;
  user: UserType | null;
  loginSendingStatus: RequestStatus;
}
