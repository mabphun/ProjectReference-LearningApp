import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterModel } from '../_models/registermodel';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  router: Router
  http: HttpClient
  email: FormControl
  registerModel: RegisterModel
  acceptTermsAndConditions: boolean
  // Alerts
  show: boolean
  alertColor: string
  alertMessage: string


  constructor(http:HttpClient, router:Router) {
    this.http = http
    this.router = router
    this.acceptTermsAndConditions = false
    
    this.registerModel = new RegisterModel()
    this.email = new FormControl('', [Validators.required, Validators.email])

    this.show = false
    this.alertColor = ''
    this.alertMessage = ''
  }

  public sendRegisterCredentials() : void {
    this.http.put("http://localhost:5127/Auth", this.registerModel)
    .subscribe(
      (success) => {
        this.showAlert("Registration was successful!", "success")
        setTimeout(() => 
        {
          this.router.navigate(['/login'])
        },
        5000);
      },
      (error) => {
        
        this.showAlert("An error happened, please try again.", "danger")
      })
  }

  public showAlert(msg: string, colorInput: string) : void {
    this.alertColor = 'alert-' + colorInput // alert-danger
    this.alertMessage = msg
    this.show = true
  }

  public alertClosed() : void {
    this.show = false
  }
}
