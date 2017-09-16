import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

    public _opened: boolean = false;

public _toggleSidebar() {
  this._opened = !this._opened;
}

name:string;
constructor() {
  this.name = 'sidebar';
}
  ngOnInit() {
  }

}
