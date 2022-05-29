import { Invitation } from './invitation';
import { InvitationStatus } from './invitationStatus';
export interface InvitationInfoDto {
  eventInvitation:Invitation,
  eventInvitationStatus:InvitationStatus
}
