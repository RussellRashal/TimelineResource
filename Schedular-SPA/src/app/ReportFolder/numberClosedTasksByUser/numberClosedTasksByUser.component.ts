import { UserClosedTask } from './../../_models/UserClosedTasks';
import { NumberClosedTasksByUserService } from './../../_services/NumberClosedTasksByUser.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-number-closed-tasks-by-user',
  templateUrl: './numberClosedTasksByUser.component.html',
  styleUrls: ['./numberClosedTasksByUser.component.css']
})
export class NumberClosedTasksByUserComponent implements OnInit {
  userClosed;
  users: any[] = [];
  closedData: any[] = [];
  profileForm;
  dateError: boolean;
  i = 0;

  public barChartOptions: ChartOptions = {
    responsive: true,
     // We use these empty structures as placeholders for dynamic theming.
     scales: { xAxes: [{}], yAxes: [{}] },
     plugins: {
       datalabels: {
         anchor: 'end',
         align: 'end',
       }
     }
  };
  public barChartLabels: Label[]; // = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [pluginDataLabels];


  public barChartData: ChartDataSets[] = [
    { data: [],
      label: 'Closed Tasks',
      backgroundColor: '#1748ff'
    },
  ];


  constructor(
    private numberClosedTasksByUserService: NumberClosedTasksByUserService) { }


  ngOnInit() {
    this.initialiseForm();
  }

  onSubmit() {
    if (this.profileForm.value.startDate > this.profileForm.value.endDate) {
      this.dateError = true;
    }
    else {
      this.numberClosedTasksByUserService.GetClosedTaskbyUser(this.profileForm.value.startDate,
        this.profileForm.value.endDate).subscribe(data => {
          this.users = [];
          this.closedData = [];

          this.userClosed = data;

          // name to appear on the bottom of the graph
          // tslint:disable-next-line: prefer-for-of
          for (let i = 0; i < this.userClosed.length ; i++) {
            this.users.push(this.userClosed[i].userName);
          }

          this.barChartLabels = this.users;

          // number of closed tasks to show on the y axis
          // tslint:disable-next-line: prefer-for-of
          for (let i = 0; i < this.userClosed.length ; i++) {
            this.closedData.push(this.userClosed[i].closedTasks);
          }
          this.barChartData = [
            { data: this.closedData,
              label: 'Closed Tasks',
              backgroundColor: '#1748ff'
            },
          ];
      }, error => {
        console.log(error);
      });
    }
  }

  initialiseForm() {
    this.profileForm = new FormGroup({
      startDate: new FormControl(new Date().toISOString().slice(0, 10)),
      endDate: new FormControl(new Date().toISOString().slice(0, 10))
    });
  }

  // validation
  getDateError(){
    return this.dateError;
  }

  // has the user logged in
  loggedIn() {
    const token = localStorage.getItem('token');
    return !!token;
  }

  loggedOut() {
    const token = localStorage.removeItem('token');
    console.log('logged out');
  }



}
