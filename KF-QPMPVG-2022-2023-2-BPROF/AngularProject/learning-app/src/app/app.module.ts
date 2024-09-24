import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

//SOCIAL LOGIN
import { SocialLoginModule, SocialAuthServiceConfig } from '@abacritt/angularx-social-login';
import { GoogleLoginProvider } from '@abacritt/angularx-social-login';


//COMPONENTS
import { NavigationComponent } from './navigation/navigation.component';
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

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    HomeComponent,
    OwnSetsComponent,
    BrowseComponent,
    CreateSetComponent,
    ProfileComponent,
    LoginComponent,
    LogoutComponent,
    RegisterComponent,
    PlayComponent,
    FlashcardComponent,
    ModesComponent,
    EditSetComponent,
    GoogleLoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    SocialLoginModule,
  ],
  providers: [{
    provide: 'SocialAuthServiceConfig',
    useValue: {
      autoLogin: false,
      providers: [
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider('991099406138-dj3be5k799tt3290mg3dfd4nvc3savco.apps.googleusercontent.com'),
        },
      ],
    } as SocialAuthServiceConfig,
  },],
  bootstrap: [AppComponent]
})
export class AppModule { }
