import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'frontend';
  userValid = false;
  user = localStorage.getItem("user");

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    if (sessionStorage.getItem("username") != undefined) {
      this.userValid = true;
    }
   }


  logout() {
    sessionStorage.clear();
    alert("Successfully logged out");
    this.router.navigate(['/login']);
  }

  checkLogin() {
    if (!this.userValid) {
      alert("Please log in first");
      this.router.navigate(['/login']);
    }
  }
}
