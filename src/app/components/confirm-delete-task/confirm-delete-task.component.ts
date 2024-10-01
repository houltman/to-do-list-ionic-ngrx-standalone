import { Component, OnInit, Input } from '@angular/core';
import { ModalController, IonicModule } from '@ionic/angular';
@Component({
    selector: 'app-confirm-delete-task',
    templateUrl: './confirm-delete-task.component.html',
    styleUrls: ['./confirm-delete-task.component.scss'],
    standalone: true,
    imports: [IonicModule],
})
export class ConfirmDeleteTaskComponent {
    @Input() task: string = '';

    constructor(private modalCtrl: ModalController) {}

    confirmDelete() {
        this.modalCtrl.dismiss({ confirmed: true });
    }

    dismissModal() {
        this.modalCtrl.dismiss({ confirmed: false });
    }
}
