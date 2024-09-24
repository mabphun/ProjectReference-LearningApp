import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginModel } from '../_models/loginmodel';
import { TokenModel } from '../_models/tokenmodel';
import { GoogleLoginProvider, SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { GoogleModel } from '../_models/googlemodel';

declare const FB: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  socialUser!: SocialUser
  router: Router
  http: HttpClient
  //username: FormControl
  //snackBar: MatSnackBar
  loginModel: LoginModel
  unsuccessful: boolean

  constructor(http:HttpClient, router:Router, private socialAuthService: SocialAuthService) {

    this.http = http
    this.router = router
    this.unsuccessful = false
    this.loginModel = new LoginModel()
    //this.username = new FormControl('', [Validators.required, Validators.email])
  }

  ngOnInit(): void {
    this.socialAuthService.authState.subscribe((user) => {
      this.socialUser = user;
      if (user != null){
        //console.log(this.socialUser);
        let tokenmodel = new GoogleModel()
        tokenmodel.token = this.socialUser.idToken
        tokenmodel.image = this.socialUser.photoUrl
        this.http
        .post<TokenModel>("http://localhost:5127/Auth/Google", tokenmodel)
        .subscribe(
        (success) => {
          //localStorage.setItem('username', this.loginModel.username)
          localStorage.setItem('userid', success.id)
          localStorage.setItem('token', success.token)
          localStorage.setItem('token-expiration', success.expiration.toString())

          //console.log(success)
          this.router.navigate(['/home'])
        },
        (error) => {
          this.unsuccessful = true
          //this.snackBar.open(error.message, "Close", { duration: 5000 })
        })
      }
      //this.http.post()
    });
  }

  public sendLoginCredentials() : void {
    this.http
    .post<TokenModel>("http://localhost:5127/Auth", this.loginModel)
    .subscribe(
    (success) => {
      localStorage.setItem('username', this.loginModel.username)
      localStorage.setItem('userid', success.id)
      localStorage.setItem('token', success.token)
      localStorage.setItem('token-expiration', success.expiration.toString())

      console.log(success)
      this.router.navigate(['/home'])
    },
    (error) => {
      this.unsuccessful = true
      //this.snackBar.open(error.message, "Close", { duration: 5000 })
    })
  }

  public checkInputs() : boolean {
    return this.loginModel.username !== '' && this.loginModel.password !== ''
  }

  public alertClosed() : void {
    this.unsuccessful = false
  }


  //GOOGLE LOGIN

  

  loginWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }
  logOut(): void {
    this.socialAuthService.signOut();
  }

}
