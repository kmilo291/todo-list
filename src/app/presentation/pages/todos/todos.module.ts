import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TodosPageRoutingModule } from './todos-routing.module';

import { TodosPage } from './todos.page';
import { CategoryModalComponent } from './category-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TodosPageRoutingModule
  ],
  declarations: [TodosPage, CategoryModalComponent],
  // Para modales en Ionic 6+, agregar entryComponents si es necesario
})
export class TodosPageModule {}
