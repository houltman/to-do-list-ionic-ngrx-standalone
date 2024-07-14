import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { IonHeader,IonCard,IonCardContent,IonCardHeader,IonCardTitle,IonAlert,IonText,IonInput, IonToolbar, IonTitle, IonContent, IonFab,IonButton,IonButtons, IonFabButton, IonIcon, IonItem, IonList, IonToggle, IonLabel } from '@ionic/angular/standalone';

@Component({
  selector: 'app-not-tasks',
  templateUrl: './not-tasks.component.html',
  styleUrls: ['./not-tasks.component.scss'],
  standalone: true,
  imports: [  CommonModule,IonCard,IonCardContent,IonCardHeader,IonCardTitle,IonInput,IonText,IonHeader, IonAlert,IonToolbar, IonTitle, IonContent, IonFab,IonButton,IonButtons, IonFabButton, IonIcon, IonItem, IonList,IonToggle,IonLabel],

})
export class NotTasksComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
