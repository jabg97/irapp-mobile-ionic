import { Usuario } from './Usuario';

export class LoginResponse {
  status: number;
  message: string
  usuario: Usuario;

  constructor() {
  }
  setData(status: number, message: string, usuario: Usuario) {
    this.status = status;
    this.message = message;
    this.usuario = usuario;
  }

}
