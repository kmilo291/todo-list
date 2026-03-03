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

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(),
            AppRoutingModule,HttpClientModule],
  providers: [
    {provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    // {provide: TodoRepository, useClass: LocalStorageTodoRepository},
    // {provide: CategoryRepository, useClass: LocalStorageCategoryRepository},
    // Nuevos proveedores para obtener la información
    { provide: TodoRepository, useClass: JsonTodoRepository },
    { provide: CategoryRepository, useClass: JsonCategoryRepository },


  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
