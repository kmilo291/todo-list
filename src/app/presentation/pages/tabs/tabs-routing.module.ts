import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'todos',
        loadChildren: () =>
          import('../todos/todos.module')
            .then(m => m.TodosPageModule)
      },
      {
        path: 'categories',
        loadChildren: () =>
          import('../categories/categories.module')
            .then(m => m.CategoriesPageModule)
      },
      {
        path: 'settings',
        loadChildren: () =>
          import('../settings/settings.module')
            .then(m => m.SettingsPageModule)
      },
      {
        path: '',
        redirectTo: 'todos',
        pathMatch: 'full'
      }
    ]
  }
];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
