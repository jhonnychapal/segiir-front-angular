import { Usuario } from './usuario.model';
export class Proyecto {
    constructor(
        public nombre: string,
        public descripcion: string,
        public director: Usuario,
        public met: Usuario,
        // tslint:disable-next-line: variable-name
        public _id?: string
    ){}
}
