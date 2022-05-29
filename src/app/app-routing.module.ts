import { UpdateAccountComponent } from './components/update-account/update-account.component';
import { NotloggedGuard } from './guards/notlogged.guard';
import { UserAccountComponent } from './components/user-account/user-account.component';
import { InviteUserComponent } from './components/invite-user/invite-user.component';
import { AddNewEventComponent } from './components/add-new-event/add-new-event.component';
import { InvitationListComponent } from './components/invitation-list/invitation-list.component';
import { VerifyAccountComponent } from './components/verify-account/verify-account.component';
import { InvitationComponent } from './components/invitation/invitation.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventsComponent } from './components/events/events.component';
import { LoginGuard } from './guards/login.guard';
import { EventjoinComponent } from './components/eventjoin/eventjoin.component';
import { MyinvitationsComponent } from './components/myinvitations/myinvitations.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';

const routes: Routes = [
  {path:"",pathMatch:"full",component:EventsComponent},
  {path:"events/:type",component:EventsComponent},
  {path:"events",component:EventsComponent},
  {path:"login",component:LoginComponent,canActivate:[NotloggedGuard]},
  {path:"register",component:RegisterComponent,canActivate:[NotloggedGuard]},
  {path:"invitations/:type/:code",component:InvitationComponent},
  {path:"verifyaccount/:code",component:VerifyAccountComponent},
  {path:"invitationlist/:eventId",component:InvitationListComponent},
  {path:"addevent",component:AddNewEventComponent,canActivate:[LoginGuard]},
  {path:"eventjoin/:eventId",component:EventjoinComponent},
  {path:"invite/:eventId",component:InviteUserComponent},
  {path:"myinvitations",component:MyinvitationsComponent},
  {path:"profile",component:UserAccountComponent,canActivate:[LoginGuard]},
  {path:"update-profile",component:UpdateAccountComponent,canActivate:[LoginGuard]},
  {path:"change-password",component:ChangePasswordComponent,canActivate:[LoginGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
