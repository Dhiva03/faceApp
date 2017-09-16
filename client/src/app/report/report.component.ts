import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth-service.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
    reports;
  constructor(public authService: AuthService) { }

  ngOnInit() {
      this.authService.getReports().subscribe(data => {
          console.log(data);
          this.reports=data;
      });
      
  }

}
