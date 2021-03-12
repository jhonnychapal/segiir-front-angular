export class Tarea {
    constructor(
        public nombre: string,
        public realizada: boolean,
        // tslint:disable-next-line: variable-name
        public _id?: string
    ){}
}