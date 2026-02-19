import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { TodoRepository } from './core/ports/todo.repository.ts';
import { LocalStorageTodoRepository } from './infrastructure/repositories/localstorage-todo.repository';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {provide: TodoRepository, useClass: LocalStorageTodoRepository}
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
