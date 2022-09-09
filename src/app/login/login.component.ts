import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user = {
    username: '',
    password: ''
  };


  constructor(private router: Router, private activatedRoute: ActivatedRoute) { }

  submit() { //posting json data to server for verification
    fetch('http://localhost:3000/api/auth', {
      method: 'POST',
      headers: {'content-type': 'application/json'}, 
      body: JSON.stringify(this.user),
    })
    .then((response) => response.json())
    .then((response) => { 
      console.log('Success');
      localStorage.clear();
      localStorage.setItem("user", JSON.stringify(response));
      this.router.navigate(['/account']);
    })
  }

  ngOnInit(): void {
  }

}
