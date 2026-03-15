import { Component, OnInit } from '@angular/core';
import { ExecuteHeavyTask } from 'src/app/core/use-cases/execute-heavy-task.use-case';
import { ToastService } from '../../services/toast.service';
import { AlertController } from '@ionic/angular';
import { SeedData } from 'src/app/core/use-cases/seed-data.use-case';
import { TodoEventsService } from '../../services/todo-events.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  standalone: false
})
export class SettingsPage implements OnInit {

  progress = 0;
  running = false;

  constructor(private executeHeavyTask: ExecuteHeavyTask,
    private toastSrv: ToastService,
    private alertCtrl: AlertController,
    private seedData: SeedData,
    private todoEvents: TodoEventsService
)
  { }

  ngOnInit() {
  }

  async startHeavyTask() {

    this.running = true;
    this.progress = 0;

    const result = await this.executeHeavyTask.execute(
      5_000_000_000, // 5 billones de operaciones para ver el efecto
      (value) => {
        this.progress = value;
      }
    );

    this.running = false;

    console.log('Resultado:', result);
    this.toastSrv.success('Cálculo terminado');
  }

  async purgeStorage() {

    const alert = await this.alertCtrl.create({
      header: 'Confirmar',
      message: '¿Deseas eliminar todos los datos almacenados?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Eliminar',
          role: 'destructive',
          handler: () => {

            localStorage.clear();

            this.toastSrv.success('Datos eliminados');

          }
        }
      ]
    });

    await alert.present();
  }

  async seedDataExample() {

    const result = await this.seedData.execute();

    if (!result.success) {
      this.toastSrv.warning(result.error ?? "Error");
      return;
    }

    this.toastSrv.success("Datos de ejemplo cargados");

    this.todoEvents.notifyRefresh();

  }

}
