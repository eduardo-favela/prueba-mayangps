import { Component, OnInit } from '@angular/core';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'prueba-mayangps';

  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
    this.checkSession()
  }

  sessionStorage = sessionStorage
  key: any = null;

  checkSession() {
    if (this.sessionStorage.getItem('key')) {
      this.loginService.checkKey({ key: this.sessionStorage.getItem('key') }).subscribe(
        res => {
          this.key = res
        },
        err => {
          console.log(err);
        }
      )
    }
  }

  logOut() {
    this.loginService.logOut({ key: this.sessionStorage.getItem('key') }).subscribe(
      res => {
        if(res){
          this.checkSession()
        }
      },
      err => {
        console.log(err);
      }
    )
  }

  reloadPage(){
    window.location.replace('/');
  }
}
