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
    if (localStorage.getItem("user") != undefined) {
      this.userValid = true;
    }
   }


  logout() {
    localStorage.clear();
    console.log("logged out");
    this.router.navigate(['/login']);
  }
}
