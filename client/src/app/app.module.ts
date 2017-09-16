import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { SidebarModule } from 'ng-sidebar';
import {routing} from './app.routing';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { ReportComponent } from './report/report.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { CompareComponent } from './compare/compare.component';
import {AuthService} from './auth-service.service';
import {ToastModule} from 'ng2-toastr/ng2-toastr';
import { FileUploadModule } from 'ng2-file-upload';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    ReportComponent,
    SidebarComponent,
    CompareComponent,
    
   
  ],
  imports: [ BrowserAnimationsModule,
            BrowserModule,
            FormsModule,
            HttpModule,
            SidebarModule.forRoot(),
            routing,
            ReactiveFormsModule,
            ToastModule.forRoot(),
            FileUploadModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
