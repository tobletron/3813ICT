import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {

  userValid = false;
  roleOfUser = '';
  userInfo: any;
  userObject: any;
  userGroup: any;
  groupID: any;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.groupID = this.activatedRoute.snapshot.params['id']; //access the group id via url
  }

  getChannels() { //use the group id to select channels associated with this group
      //return list of channels to use in html
  }

  userRole(){ //check the role of the logged in user
    this.userInfo = localStorage.getItem("user"); //get user info from storage
    this.userObject = JSON.parse(this.userInfo); //convert back to json object
    this.roleOfUser = this.userObject.role //get the users role
    //console.log(this.roleOfUser);
    return this.roleOfUser;
  }


}
