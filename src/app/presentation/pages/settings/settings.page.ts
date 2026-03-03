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

  progress = 0;
  running = false;

  constructor(private executeHeavyTask: ExecuteHeavyTask, private toastSrv: ToastService)
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

}
