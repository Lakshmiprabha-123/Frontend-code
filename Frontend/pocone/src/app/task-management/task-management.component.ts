import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-task-management',
  templateUrl: './task-management.component.html',
  styleUrls: ['./task-management.component.css']
})
export class TaskManagementComponent implements OnInit, OnDestroy {

  ngOnInit(): void {
    document.body.classList.add('route-specific');
  }

  ngOnDestroy(): void {
    document.body.classList.remove('route-specific');
  }
} {

}
