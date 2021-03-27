import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ejemplo',
  templateUrl: './ejemplo.component.html',
  styles: [
  ]
})
export class EjemploComponent implements OnInit {

  doc = "../../assets/guia.pdf";

  constructor() { }

  ngOnInit(): void {
  }

}
