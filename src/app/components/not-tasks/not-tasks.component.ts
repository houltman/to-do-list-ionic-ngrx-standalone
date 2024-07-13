import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
@Component({
  selector: 'app-not-tasks',
  templateUrl: './not-tasks.component.html',
  styleUrls: ['./not-tasks.component.scss'],
  standalone: true,
  imports: [ IonicModule, CommonModule]
})
export class NotTasksComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
