import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AccountComponent } from './account/account.component';
import { GroupComponent } from './group/group.component';
import { ChannelComponent } from './channel/channel.component';

const routes: Routes = [
  {path: "login", component: LoginComponent},
  {path: "account", component: AccountComponent},
  {path: "group/:id", component: GroupComponent},
  {path: "channel", component: ChannelComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
