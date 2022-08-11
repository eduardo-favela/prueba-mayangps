import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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
  loadingChanges = false

  editUsrInfo: any = {}

  sessionStorage = sessionStorage

  alertModal = false
  alertModalMsg = ''
  alertModalSuccess = false

  falsepass = ''

  actionConfirmModal = ''

  @Output() checkSessionEvent = new EventEmitter<string>();

  checkSession() {
    this.checkSessionEvent.emit();
  }

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

  openConfirmModal(action: any) {
    this.actionConfirmModal = action
    if (action === 'saveUsrChanges') {
      $('#staticBackdrop').modal('hide')
      $('#confirmModal').modal('show')
    }
    else if (action === 'deleteUsr') {
      $('#confirmModal').modal('show')
    }
  }

  cancelConfirmModal() {
    if (this.actionConfirmModal === 'saveUsrChanges') {
      $('#confirmModal').modal('hide')
      $('#staticBackdrop').modal('show')
    }
    else if (this.actionConfirmModal === 'deleteUsr') {
      $('#confirmModal').modal('hide')
    }
    this.actionConfirmModal = ''
  }

  acceptConfirmModal() {
    this.loadingChanges = true
    if (this.actionConfirmModal === 'saveUsrChanges') {
      this.saveUser()
    }
    else if (this.actionConfirmModal === 'deleteUsr') {
      this.deleteUser()
    }
  }

  cierreModal() {
    this.alertModal = false
    this.editUsrInfo = {}
    $('#staticBackdrop').modal('hide')
  }

  showSuccessModal() {
    $('#successModal').modal('show')
  }

  showErrorModal() {
    $('#errorModal').modal('show')
  }

  successActionProccess() {
    if (this.actionConfirmModal === 'saveUsrChanges') {
      this.loadingChanges = false
      $('#confirmModal').modal('hide')
      this.alertModal = false
      this.editUsrInfo = {}
      $('#staticBackdrop').modal('hide')
      this.showSuccessModal()
      this.actionConfirmModal = ''
    }
    else if (this.actionConfirmModal === 'deleteUsr') {
      this.loadingChanges = false
      $('#confirmModal').modal('hide')
      this.actionConfirmModal = ''
      this.checkSession()
    }
  }

  deleteUser() {
    this.userService.deleteUser(this.usrInfo).subscribe(
      res => {
        if (res) {
          this.successActionProccess()
        }
        else {
          this.loadingChanges = false
          $('#confirmModal').modal('hide')
          this.actionConfirmModal = ''
          this.showErrorModal()
        }
      },
      err => {
        this.disabledFormModal = false
        this.loadingChanges = false
        $('#confirmModal').modal('hide')
        this.showErrorModal()
        console.log(err)
      }
    )
  }

  saveUser() {
    this.disabledFormModal = true
    if (this.editUsrInfo.usuario && this.editUsrInfo.descrip) {
      if (this.editUsrInfo.usuario != this.usrInfo.usuario || this.editUsrInfo.descrip != this.usrInfo.descrip || this.editUsrInfo.pass) {
        if (this.checkLength()) {
          this.userService.updateUser(this.editUsrInfo).subscribe(
            res => {
              this.disabledFormModal = false
              this.successActionProccess()
              this.getUsrInfo()
            },
            err => {
              this.disabledFormModal = false
              this.loadingChanges = false
              $('#confirmModal').modal('hide')
              $('#staticBackdrop').modal('hide')
              this.showErrorModal()
              console.log(err)
            }
          )
        }
        else {
          this.loadingChanges = false
          this.cancelConfirmModal()
          this.disabledFormModal = false
          this.alertModal = true
          this.alertModalMsg = 'El usuario y contraseña no pueden superar los 25 caracteres cada uno'
        }
      }
    }
    else {
      this.loadingChanges = false
      this.cancelConfirmModal()
      this.disabledFormModal = false
      this.alertModal = true
      this.alertModalMsg = 'No se pueden guardar el usuario o descripción vacíos'
    }
  }

  checkLength() {
    if (this.editUsrInfo.usuario.length > 25) {
      if (this.editUsrInfo.pass) {
        if (this.editUsrInfo.pass.length > 25) {
          return false
        }
        else {
          return false
        }
      }
      else {
        return false
      }
    }
    else {
      if (this.editUsrInfo.pass) {
        if (this.editUsrInfo.pass.length > 25) {
          return false
        }
        else {
          return true
        }
      }
      else{
        return true
      }
    }
  }
}
