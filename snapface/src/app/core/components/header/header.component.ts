import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  token!: boolean;

  constructor(private router: Router, private auth: AuthService) {}

  ngOnInit(): void {
    this.token = this.isActive();
  }

  onAddNewFaceSnap() {
    this.router.navigateByUrl('/facesnaps/create');
  }

  isActive() {
    const token = this.auth.getToken();
    if(token){
      return true;
    }
    return false;
  }
}
