export class Usuario {

    constructor(
        public nombre: string,
        public apellido: string,
        public email: string,
        public estado: boolean,
        public admin: boolean,
        public password?: string,
        public uid?: string,
        public _id?: string
    ){}
}
