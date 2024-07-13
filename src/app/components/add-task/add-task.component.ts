import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ModalController, IonicModule, } from '@ionic/angular';
import { CommonModule } from '@angular/common';

// Redux
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducers';

// rxjs
import { map, take } from 'rxjs';

// Directiva
import { SharedDirectivesModule } from 'src/app/directives/shared-directives.module';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss'],
  standalone: true,
  imports: [IonicModule, ReactiveFormsModule, CommonModule, SharedDirectivesModule]

})

export class AddTaskComponent implements OnInit {
  addTaskForm: FormGroup = this.formBuilder.group({});
  isAlertOpen = false; // Controla si el alerta está abierto
  alertButtons = [
    {
      text: 'Aceptar',
      role: 'cancel',
      handler: () => {
        this.setOpen(false);
      }
    }
  ];

  @Input() redux: boolean = false;

  constructor(private modalCtrl: ModalController,
    private formBuilder: FormBuilder,
    private store: Store<AppState>,
  ) { }

  ngOnInit() {
    this.addTaskForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      done: [false],
      created_at: [new Date().toISOString()],
      updated_at: [null]
    });
  }

  //ionViewDidEnter() {
  //  setTimeout(() => {
  //    this.setFocus();
  //  }, 500);
  //}

  addTask() {
    if (!this.addTaskForm.valid) {

      Object.keys(this.addTaskForm.controls).forEach(field => {
        const control = this.addTaskForm.get(field);
        control?.markAsTouched({ onlySelf: true });
        control?.updateValueAndValidity();
      });
      return;
    }
    const taskName = this.addTaskForm.get('name')?.value;
    // Si es por patron redux valido que no exista una tarea con el mismo nombre
    if (this.redux) {
      // Verificar si ya existe una tarea con el mismo nombre
      this.store.select('tasks').pipe(
        take(1), // Tomar el primer valor emitido para evitar subscripciones infinitas
        map(tasksState => tasksState.tasks.some((task: any) => task.name === taskName)),
      ).subscribe(exists => {
        if (exists) {
          this.isAlertOpen = true;

        } else {
          this.modalCtrl.dismiss({ add: true, form: this.addTaskForm.value });
        }
      });
    } else {
      this.modalCtrl.dismiss({ add: true, form: this.addTaskForm.value });
    }
    //
  }

  dismissModal() {
    this.modalCtrl.dismiss({ add: false });
  }

  setOpen(isOpen: boolean) {
    this.isAlertOpen = isOpen;
  }

  setFocus() {
    //const input = document.querySelector('ion-input');
    //input.setFocus();
  }

}

