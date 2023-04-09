import { NotExpr } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};
  constructor(public authService: AuthService, private alertify: AlertifyService) { }

  ngOnInit() {
  }

private subscription: Subscription = new Subscription();

login() {
  this.subscription = this.authService.login(this.model).subscribe({
    next: () => {
      this.alertify.success('Logged in successfully');
    },
    error: (error) => {
      this.alertify.error(error);
    },
  });
}

ngOnDestroy() {
  this.subscription.unsubscribe();
}


  loggedIn()
  {
    return this.authService.loggedIn();
  }

  logout()
  {
    localStorage.removeItem('token');
    this.alertify.message("logged out");
  }
}
