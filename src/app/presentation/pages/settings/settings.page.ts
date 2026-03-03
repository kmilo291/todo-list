import { Component, OnInit } from '@angular/core';
import { ExecuteHeavyTask } from 'src/app/core/use-cases/execute-heavy-task.use-case';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  standalone: false
})
export class SettingsPage implements OnInit {

  constructor(private executeHeavyTask: ExecuteHeavyTask, private toastSrv: ToastService)
  { }

  ngOnInit() {
  }

  async startHeavyTask() {
    console.log('Iniciando tarea pesada...');
    const result = await this.executeHeavyTask.execute(50_000_000_000);
    console.log('Resultado:', result);
    this.toastSrv.success('Cálculo terminado');
}

}
