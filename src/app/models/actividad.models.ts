import {Tarea} from './tarea.model'
export class Actividad {
    constructor(
        public nombre: string,
        public descripcion: string,
        public tarea: Tarea[],
        public _id?: string
        

    ){}
}