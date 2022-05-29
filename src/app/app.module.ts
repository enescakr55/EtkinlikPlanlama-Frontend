import { AuthInterceptor } from './interceptors/auth.interceptor';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { NaviComponent } from './components/navi/navi.component';
import { EventsComponent } from './components/events/events.component';
import { FormsModule, ReactiveFormsModule, FormGroupDirective  } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { EventFilterPipe } from './pipes/event-filter.pipe';
import { RegisterComponent } from './components/register/register.component';
import { BrowserModule } from '@angular/platform-browser';
import { InvitationComponent } from './components/invitation/invitation.component';
import { VerifyAccountComponent } from './components/verify-account/verify-account.component';
import { InvitationListComponent } from './components/invitation-list/invitation-list.component';
import { AddNewEventComponent } from './components/add-new-event/add-new-event.component';
import { EventjoinComponent } from './components/eventjoin/eventjoin.component';
import { MyinvitationsComponent } from './components/myinvitations/myinvitations.component';
import { InviteUserComponent } from './components/invite-user/invite-user.component';
import { UserAccountComponent } from './components/user-account/user-account.component';
import { UpdateAccountComponent } from './components/update-account/update-account.component';
import { FooterComponent } from './components/footer/footer.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NaviComponent,
    EventsComponent,
    EventFilterPipe,
    RegisterComponent,
    InvitationComponent,
    VerifyAccountComponent,
    InvitationListComponent,
    AddNewEventComponent,
    EventjoinComponent,
    MyinvitationsComponent,
    InviteUserComponent,
    UserAccountComponent,
    UpdateAccountComponent,
    FooterComponent,
    ChangePasswordComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right'
    }),

  ],
  providers: [{
    provide:HTTP_INTERCEPTORS,useClass:AuthInterceptor,multi:true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
