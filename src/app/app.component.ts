import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = '3813ICT Assignment';
  userValid = false;
  user = localStorage.getItem("user");

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    if (sessionStorage.getItem("username") != undefined) {
      this.userValid = true;
    }
   }

 /**
  * It clears the session storage and navigates to the login page
  */
  logout() {
    sessionStorage.clear();
    alert("Successfully logged out");
    this.router.navigate(['/login']);
  }

  /**
   * If the user is not logged in, show an alert and redirect to the login page
   */
  checkLogin() {
    if (!this.userValid) {
      alert("Please log in first");
      this.router.navigate(['/login']);
    }
  }
}
