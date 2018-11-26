
export class Usuario {
  id: number;
  email: string;
  name: string;

  constructor() {
  }
  setData(id: number, email: string, name: string) {
    this.id = id;
    this.email = email;
    this.name = name;
  }

}
