export class User {
  idUser!:number;
  username!:string;
  password!:string;
  name!:string;
  surname!:string;
  dni!:string;
  email!:string;
  role?:{
    id: number;
    name: string;
  }
}
