import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { OwnSetsComponent } from './own-sets/own-sets.component';
import { BrowseComponent } from './browse/browse.component';
import { CreateSetComponent } from './create-set/create-set.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { RegisterComponent } from './register/register.component';
import { PlayComponent } from './play/play.component';
import { FlashcardComponent } from './flashcard/flashcard.component';
import { ModesComponent } from './modes/modes.component';
import { EditSetComponent } from './edit-set/edit-set.component';
import { GoogleLoginComponent } from './google-login/google-login.component';
import { ApiService } from './api.service';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'own-sets', component: OwnSetsComponent, canActivate: [ApiService] },
  { path: 'browse', component: BrowseComponent },
  { path: 'create-set', component: CreateSetComponent, canActivate: [ApiService] },
  { path: 'profile', component: ProfileComponent, canActivate: [ApiService] },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent, canActivate: [ApiService] },
  { path: 'register', component: RegisterComponent },
  { path: 'play/:id', component: PlayComponent, canActivate: [ApiService] },
  { path: 'flashcard/:id', component: FlashcardComponent, canActivate: [ApiService] },
  { path: 'modes/:id', component: ModesComponent, canActivate: [ApiService] },
  { path: 'edit/:id', component: EditSetComponent, canActivate: [ApiService] },



  { path: 'google', component: GoogleLoginComponent },

  // { path: 'create-subject', component: CreateSubjectComponent, canActivate: [ApiService] },
  // { path: 'create-teacher', component: CreateTeacherComponent, canActivate: [ApiService] },
  
  // { path: 'connect', component: ConnectTeacherToSubjectComponent, canActivate: [ApiService] },

  // { path: 'update-subject/:id', component: UpdateSubjectComponent, canActivate: [ApiService] },
  // { path: 'update-teacher/:id', component: UpdateTeacherComponent, canActivate: [ApiService] },

  { path: '**', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
