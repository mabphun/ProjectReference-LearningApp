import { SocialAuthService } from '@abacritt/angularx-social-login';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent {
  router: Router

  constructor(router: Router, private socialAuthService: SocialAuthService){
    this.router = router
  }

  ngOnInit(): void {
    
    localStorage.setItem('token', '')
    localStorage.setItem('token-expiration', '')
    localStorage.setItem('username', '')
    localStorage.clear()
    this.logOut()
    this.router.navigate(['/home'])
  }

  logOut(): void {
    this.socialAuthService.signOut();
  }
}
