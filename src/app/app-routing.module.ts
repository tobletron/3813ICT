import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AccountComponent } from './account/account.component';
import { GroupComponent } from './group/group.component';
import { ChannelComponent } from './channel/channel.component';
import { AdminComponent } from './admin/admin.component';
import { AdminGroupComponent } from './admin-group/admin-group.component';
import { AdminChannelComponent } from './admin-channel/admin-channel.component';

/* Defining the routes for the application. */
const routes: Routes = [
  {path: "login", component: LoginComponent},
  {path: "account", component: AccountComponent},
  {path: "group", component: GroupComponent},
  {path: "channel", component: ChannelComponent},
  {path: "admin", component: AdminComponent},
  {path: "adminGroup", component: AdminGroupComponent},
  {path: "adminChannel", component: AdminChannelComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
