import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  constructor(private userService: UserService) { }

  usrInfo: any = {
    usuarioID: '',
    usuario: '',
    contra: '',
    descrip: ''
  }

  disabledFormModal = false

  editUsrInfo: any = {}

  sessionStorage = sessionStorage

  alertModal = false
  alertModalMsg = ''
  alertModalSuccess = false

  falsepass = ''

  ngOnInit(): void {
    this.getUsrInfo()
  }

  getUsrInfo() {
    this.userService.getUserInfo({ key: this.sessionStorage.getItem('key') }).subscribe(
      res => {
        if (res) {
          this.usrInfo = { ...res };
          this.falsepass = this.usrInfo.contra.replace(/./g, "*");
        }
      },
      err => {
        console.log(err);
      }
    )
  }

  openEditModal() {
    this.editUsrInfo = { ...this.usrInfo }
    $('#staticBackdrop').modal('show')
  }

  openConfirmModal() {

  }

  openConfirmDelModal() {

  }

  cierreModal() {
    this.alertModal = false
    this.alertModalSuccess = false
    this.editUsrInfo = {}
  }

  saveUser() {
    if (this.editUsrInfo.usuario != this.usrInfo.usuario || this.editUsrInfo.descrip != this.usrInfo.descrip || this.editUsrInfo.pass) {
      //FALTA VALIDAR LOS DATOS (LONGITUD DE USUARIO, CONTRASEÑA Y DESCRIPCION)
      this.userService.updateUser(this.editUsrInfo).subscribe(
        res => {
          this.alertModalSuccess = true
        },
        err => {
          console.log(err)
        }
      )
    }
  }
}
