import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpService } from '../http.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  /* declare variables */
  username = "";
  password:any = "";
  userObject: any = {};
  url = "http://localhost:3000";

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private httpClient: HttpClient) { }

  ngOnInit(): void {
  }

  /**
   * The submit function is called when the user clicks the submit button. It calls the validate
   * function to check if the username and password are valid. If they are, it sends a post request to
   * the server to check if the user exists. If the user exists, it sets the username and role in
   * session storage and navigates to the account page
   */
  submit() { 

    //send user/pass to function to validate -> returns as an object
    this.userObject = this.validate(this.username, this.password); 

    if (this.userObject != null) {
      this.httpClient.post(this.url + "/api/auth", JSON.stringify(this.userObject), httpOptions).subscribe((data: any) => {
        if (data.valid) {
          sessionStorage.setItem('username', data.username);
          this.httpClient.get(this.url + "/api/getUsers").subscribe((result: any) => {
            for (let i = 0; i < result.length; i++) {
              if (result[i].username == data.username) {
                sessionStorage.setItem('role', result[i].role);
                this.router.navigateByUrl('/account');
              }
            }
          });
        }
        else {
          alert("Incorrect username/password");
        }
        
      });
    }
  }

  /**
   * If the username and password are valid, return the username and password, otherwise alert the user
   * of the error and return nothing.
   * @param {any} username - any, password: any
   * @param {any} password - any
   * @returns an object with the username and password.
   */
  validate(username: any, password: any) {

    var usernameValid = true;
    var passwordValid = true;
    var error: string = "";

    if (username.length > 0) { //check 1: username is not empty
      for (let i=0; i < username.length; i++) { //check 2: username does not contain spaces
        if (username.charAt(i) == " ") {
          usernameValid = false;
          error = "Username and/or Password must not contain spaces";
        }
      }
    }
    else { usernameValid = false; error = "Username and/or Password must not be empty"; }

    if (password != "") { //check 1: password is not empty
    }
    else { passwordValid = false; error = "Password must not be empty"; }

    if (usernameValid && passwordValid) {
      return { username: username, password: password };
    }
    else {
      alert(error);
      return;
    }
  }

}
