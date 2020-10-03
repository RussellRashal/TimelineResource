import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-testtask',
  templateUrl: './TestTask.component.html',
  styleUrls: ['./TestTask.component.css']
})
export class TestTaskComponent implements OnInit {
  taskId;


  constructor(
    private route: ActivatedRoute
  ) {}


  ngOnInit() {
    this.route.data.subscribe(data => {
      this.taskId = data['taskSchedule'];
    });

    console.log('below is testtask');
    console.log(this.taskId);


  }

  // this is a test


}
