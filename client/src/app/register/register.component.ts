import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup ,Validators,FormControl} from '@angular/forms';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import {ViewContainerRef} from '@angular/core';
import { FileUploader} from 'ng2-file-upload';
import {AuthService} from '../auth-service.service';
import { Router } from '@angular/router';

const URL = '/register/api/reg';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    public uploader:FileUploader = new FileUploader({url: URL});
    
form;
path;
employeeIdValid;
employeeIdMessage;
employeeIdClass;


  constructor(public router: Router,public vcr: ViewContainerRef,private formBuilder: FormBuilder,public authService: AuthService,public toastr: ToastsManager) {
    this.regForm();
     this.toastr.setRootViewContainerRef(vcr);
     this.path;
   }

   regForm() {

this.form = this.formBuilder.group({
     salary: ['', Validators.compose([
        Validators.required, 
        Validators.minLength(5), 
        Validators.maxLength(10),
        this.validatesalary
      ])],
     
      firstName: ['', Validators.compose([
        Validators.required, 
        Validators.minLength(3),
        Validators.maxLength(15),
        this.validatefirstName 
      ])],
       lastName: ['', Validators.compose([
        Validators.required, 
        Validators.minLength(3),
        Validators.maxLength(15),
        this.validatelastName 
      ])],
       employeeId: ['', Validators.compose([
        Validators.required, 
        Validators.minLength(6),
        Validators.maxLength(30),
        this.validateemployeeId 
      ])],
  }); 
 
  }


  
 
  
  validatefirstName(controls) {
   
    const regExp = new RegExp(/^[a-zA-Z0-9]+$/);
   
    if (regExp.test(controls.value)) {
      return null; 
    } else {
      return { 'validatefirstName': true } 
    }
  }
    validatelastName(controls) {
   
    const regExp = new RegExp(/^[a-zA-Z0-9]+$/);
   
    if (regExp.test(controls.value)) {
      return null; 
    } else {
      return { 'validatelastName': true } 
    }
  }
  validateemployeeId(controls) {
   
    const regExp = new RegExp(/^[a-zA-Z0-9]+$/);
   
    if (regExp.test(controls.value)) {
      return null; 
    } else {
      return { 'validateemployeeId': true } 
    }
}
  validatesalary(controls) {
   
    const regExp = new RegExp(/^[0-9]+$/);
   
    if (regExp.test(controls.value)) {
      return null; 
    } else {
      return { 'validatesalary': true } 
    }
  }

  onRegisterSubmit()
  {
      console.log("form submitted");
     const employee = {
              employeeId: this.form.get('employeeId').value,
              firstName: this.form.get('firstName').value, 
              lastName: this.form.get('lastName').value,
              salary: this.form.get('salary').value,
              path:this.path,
            }
            console.log(employee);
      this.authService.registerEmployee(employee).subscribe(data => {
             console.log(data);
          if (!data.success) {
                    this.toastr.error(data.message, 'Oops!');
                } else {
              this.toastr.success(data.message, 'Success!');
              setTimeout(() => {
                  this.router.navigate(['/register']); 
                }, 2000);
        }
        });

}
 
ngOnInit() {
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
        var responsePath = JSON.parse(response); 
        if(responsePath.success){
        this.toastr.success(responsePath .message, 'Success!');
        this.path=responsePath.path;}
        else{
            this.toastr.error(responsePath .message, 'Ops!');}
        };
}
checkEmployeeId() {
    
    this.authService.checkEmployeeId(this.form.get('employeeId').value).subscribe(data => {
     if (!data.success) {
        this.employeeIdValid = false; 
        this.employeeIdMessage = data.message; 
        this.employeeIdClass='alert alert-danger';
      } else {
        this.employeeIdValid = true; 
        this.employeeIdMessage = data.message; 
         this.employeeIdClass='alert alert-success';
      }
    });
  }

}

