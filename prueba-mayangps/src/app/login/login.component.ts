import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { LoginService } from '../services/login.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private loginService: LoginService, private userService: UserService) { }

  sessionStorage = sessionStorage

  loginInfo: any = {
    usuario: '',
    contra: '',
  }

  newUsrInfo: any = {
    usuario: '',
    contra: '',
    descrip: ''
  }

  alertMsg = ''
  alert = false
  alertModalMsg = ''
  alertModal = false
  alertModalSuccess = false

  disabledFormLogin = false
  disabledFormModal = false

  @Output() checkSessionEvent = new EventEmitter<string>();

  checkSession() {
    this.checkSessionEvent.emit();
  }

  ngOnInit(): void {
  }

  generateKey() {
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = ""
    let charactersLength = characters.length;

    for (let i = 0; i < 25; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    this.loginService.setSessionKey({ usuarioID: this.loginInfo.usuario, key: result }).subscribe(
      res => {
        this.sessionStorage.setItem('key', result)
        this.checkSession();
      },
      err => {
        console.log(err);
      }
    )
  }

  login() {
    this.disabledFormLogin = true
    if (this.loginInfo.usuario && this.loginInfo.contra) {
      this.loginService.login(this.loginInfo).subscribe(
        data => {
          if (data) {
            this.generateKey()
            this.disabledFormLogin = false
          }
          else {
            this.disabledFormLogin = false
            this.alert = true
            this.alertMsg = 'Usuario o contraseña incorrectos'
          }
        },
        err => {
          console.log(err);
          this.disabledFormLogin = false
          this.alert = true
          this.alertMsg = 'Error de comunicación con el servidor'
        }
      )
    }
    else {
      this.disabledFormLogin = false
      this.alert = true
      this.alertMsg = 'Falta uno o más campos por llenar'
    }
  }

  setUser() {
    this.disabledFormModal = true
    if (this.newUsrInfo.usuario && this.newUsrInfo.contra && this.newUsrInfo.descrip) {
      if (this.checkLength()) {
        this.userService.setUser(this.newUsrInfo).subscribe(
          data => {
            if (data) {
              this.disabledFormModal = false
              this.generateKey()
              this.alertModalSuccess = true
              this.alertModal = false
              this.newUsrInfo = {
                usuario: '',
                contra: '',
                descrip: ''
              }
            }
            else {
              this.disabledFormModal = false
              this.alertModal = true
              this.alertModalMsg = 'El usuario ya existe'
              this.alertModalSuccess = false
            }
          },
          err => {
            console.log(err)
            this.disabledFormModal = false
            this.alertModalSuccess = false
            this.alertModal = true
            this.alertModalMsg = 'Error de comunicación con el servidor'
          }
        )
      }
      else {
        this.disabledFormModal = false
        this.alertModalSuccess = false
        this.alertModal = true
        this.alertModalMsg = 'El usuario y contraseña no pueden superar los 25 caracteres cada uno'
      }
    }
    else {
      this.disabledFormModal = false
      this.alertModalSuccess = false
      this.alertModal = true
      this.alertModalMsg = 'Falta uno o más campos por llenar'
    }
  }

  cierreModal() {
    this.alertModal = false
    this.alertModalMsg = ''
    this.alertModalSuccess = false
    this.newUsrInfo = {
      usuario: '',
      contra: '',
      descrip: ''
    }
  }

  checkLength() {
    if (this.newUsrInfo.usuario.length > 25) {
      return false
    }
    if (this.newUsrInfo.contra.length > 25) {
      return false
    }
    return true
  }
}
