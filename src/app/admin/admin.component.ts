import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  /* variable intialisation */
  inputUser = { username: "", email: "", password: 123, role: "", selectedFile: ""};
  selectedFile: any = null;
  inputUsername: string = "";
  inputEmail: string = "";
  inputPassword: string = "";
  inputRole: string = "";
  username: string = "";
  userRole: string = "";
  url = "http://localhost:3000";
  imagePath: any = "";
  userBeingUpdated = false;
  imageObj: any = {};

  constructor(private router: Router, private httpClient: HttpClient) { }

  /**
   * This function checks if the user is logged in, if not, it redirects them to the login page. If the
   * user is logged in, it sets the username and user role to the session storage values. If the user
   * is updating a user, it sets the input values to the session storage values
   */
  ngOnInit(): void {
    //check user is logged in
    if (!sessionStorage.getItem('username')) {
      sessionStorage.clear();
      alert("Please log in first");
      this.router.navigateByUrl('/login');
    }

    this.username = sessionStorage.getItem('username')!;
    this.userRole = sessionStorage.getItem('role')!;


    if (sessionStorage.getItem('inputUsername') != undefined) {
      this.userBeingUpdated = true;
      this.inputUsername = sessionStorage.getItem('inputUsername')!;
      this.inputEmail = sessionStorage.getItem('inputEmail')!;
      this.inputRole = sessionStorage.getItem('inputRole')!;
    }
    
  }


  /**
   * If the user is being updated, delete the existing user and insert the updated user. If the user is
   * being created, insert the user
   * @param {any} user - any - this is the user object that is being passed in from the form.
   */
  submitForm(user: any) {
    //UPDATE USER
    if (this.userBeingUpdated){ 
      //delete the existing user
      var existingUser = { username: this.inputUsername };
      this.httpClient.post(this.url + "/api/deleteUser", JSON.stringify(existingUser), httpOptions).subscribe((data: any) => {
        if (data == true) {
          console.log("Updating user success 1 of 2");
        }
        else {
          alert("error updating user 1 of 2");
          return;
        }
      });
      //insert user with updated details
      this.httpClient.post(this.url + "/api/insertUser", JSON.stringify(user), httpOptions).subscribe((data: any) => {
        if (data == true) {
          console.log("successfully updated user 2 of 2");
          sessionStorage.removeItem('inputUsername');
          sessionStorage.removeItem('inputEmail');
          sessionStorage.removeItem('inputPassword');
          sessionStorage.removeItem('inputRole');
          this.router.navigateByUrl("/account");
        }
        else {
          alert("error updating user 2 of 2");
        }
      });
    }
    //CREATE USER
    else {
      this.httpClient.post(this.url + "/api/insertUser", JSON.stringify(user), httpOptions).subscribe((data: any) => {
        if (data == true) {
          console.log("successfully created user");
        }
        else {
          console.log("error creating user");
        }
      });
      this.router.navigateByUrl("/account");
    }
  }

  onFileSelection(event: any) {
    this.selectedFile = event.target.files[0];
  }

}
