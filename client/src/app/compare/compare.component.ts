import { Component, OnInit } from '@angular/core';
import { FileUploader} from 'ng2-file-upload';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import {ViewContainerRef} from '@angular/core';
import {AuthService} from '../auth-service.service';

const URLIN = '/api/in';
const URLOUT = '/api/out';
@Component({
  selector: 'app-compare',
  templateUrl: './compare.component.html',
  styleUrls: ['./compare.component.css']
})
export class CompareComponent implements OnInit {
    path;
    public uploaderIn:FileUploader = new FileUploader({url: URLIN});
    public uploaderOut:FileUploader = new FileUploader({url: URLOUT});
  constructor(public vcr: ViewContainerRef,public authService: AuthService,public toastr: ToastsManager) {
      this.path;
      this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() { 
      this.uploaderIn.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      var responsePath = JSON.parse(response); 
      if(responsePath.success){
      this.toastr.success(responsePath .message, 'Success!');
      this.path=responsePath.path;}
      else{
          this.toastr.error(responsePath .message, 'Ops!');}
      };
      this.uploaderOut.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
          var responsePath = JSON.parse(response); 
          if(responsePath.success){
          this.toastr.success(responsePath .message, 'Success!');
          this.path=responsePath.path;}
          else{
              this.toastr.error(responsePath .message, 'Ops!');}
          };
      
  }

}
