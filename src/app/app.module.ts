import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { TodoRepository } from './core/ports/todo.repository';
import { LocalStorageTodoRepository } from './infrastructure/repositories/localstorage-todo.repository';
import { CategoryRepository } from './core/ports/category.repository';
import { LocalStorageCategoryRepository } from './infrastructure/repositories/localstorage-category.repository';
import { HttpClientModule } from '@angular/common/http';
import { JsonTodoRepository } from './infrastructure/repositories/json-todo.repository';
import { JsonCategoryRepository } from './infrastructure/repositories/json-category.repository';
import { HeavyTaskPort } from './core/ports/heavy-task.port';
import { WorkerHeavyTaskAdapter } from './infrastructure/background/worker-heavy-task.adapter';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(),
            AppRoutingModule,HttpClientModule],
  providers: [
    {provide: RouteReuseStrategy, useClass: IonicRouteStrategy },

    {provide: TodoRepository, useClass: LocalStorageTodoRepository},
    {provide: CategoryRepository, useClass: LocalStorageCategoryRepository},

    // proveedor para obtener la información desde JSON file - Todo
    // { provide: TodoRepository, useClass: JsonTodoRepository },

    // proveedor para obtener la información desde JSON file - Categoria
    // { provide: CategoryRepository, useClass: JsonCategoryRepository },

    // Proveedor para usar worker con tareas pesadas
    { provide: HeavyTaskPort, useClass: WorkerHeavyTaskAdapter },
  ],

  bootstrap: [AppComponent],
})
export class AppModule {}
