import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { UserapiService } from '../services/userapi.service';

@Component({
  selector: 'app-headernav',
  templateUrl: './headernav.component.html',
  styleUrls: ['./headernav.component.scss']
})
export class HeadernavComponent implements OnInit {

  @Input() pageType: string = '';
  showLogOutButton: boolean = false;

  constructor(private userApiService: UserapiService, private router: Router, private toast: NgToastService) { }

  ngOnInit(): void {
    if(this.pageType == 'authentication') {
      this.showLogOutButton = false;
    } else {
      this.showLogOutButton = true;
    }
  }

  handleLogout(){
    this.userApiService.setUserLoggedOut();
    this.toast.success({detail: "Logged Out", summary: "Thank you", duration: 5000});
    this.router.navigate(['/login']);
  }

}