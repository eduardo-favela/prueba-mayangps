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
  key = null;

  checkSession(){
    if(this.sessionStorage.getItem('key')){
      this.loginService.checkKey(this.sessionStorage.getItem('key')).subscribe(
        res=>{
          console.log(res)
        },
        err => {
          console.log(err);
        }
      )
    }
  }
}
