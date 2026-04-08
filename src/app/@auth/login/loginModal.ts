export class Login {
   constructor(
      public id: any,
      public email: string,
      public name: string,
      public roleName: string,
      public roleId: string,
      public emailId: string,
      public _token?:string
   ) { }
}