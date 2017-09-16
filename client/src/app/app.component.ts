import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  title = 'app works!';
  public _opened: boolean = false;

 public _toggleSidebar() {
   this._opened = !this._opened;
 }
 
 name:string;
 constructor() {
   this.name = 'sidebar';
 }
}
