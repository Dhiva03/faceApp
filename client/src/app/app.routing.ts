import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RegisterComponent } from './register/register.component';
import { CompareComponent } from './compare/compare.component';
import { ReportComponent } from './report/report.component';

const APP_ROUTES: Routes = [
  // { path: '', component: AppComponent },
   { path: 'register', component: RegisterComponent },
    { path: 'compare', component: CompareComponent },
     { path: 'report', component: ReportComponent }
];

export const routing = RouterModule.forRoot(APP_ROUTES);