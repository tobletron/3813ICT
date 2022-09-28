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

  username = "";
  password:any = "";
  userObject: any = {};
  url = "http://localhost:3000";

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private httpClient: HttpClient) { }


  ngOnInit(): void {
  }

  submit() { 
    this.userObject = { username: this.username, password: this.password };
    console.log("attempting to log in: ", this.userObject);

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
