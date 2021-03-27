import { Component, OnInit } from '@angular/core';
import { NavbarService} from '../services/navbar.service'

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent implements OnInit {

  constructor(private navbarService: NavbarService ) { }

  ngOnInit(): void {
    this.navbarService.cargarMenu();
  }

}
