import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuardService } from '@app/core';

import { ExamplesComponent } from './examples/examples.component';
import { AuthenticatedComponent } from './authenticated/authenticated.component';
import { CrudComponent } from './crud/components/crud.component';
import { GearsComponent } from './gears/gears.component';

const routes: Routes = [
  {
    path: '',
    component: ExamplesComponent,
    children: [
      {
        path: '',
        redirectTo: 'gears',
        pathMatch: 'full'
      },
      {
        path: 'crud',
        component: CrudComponent,
        data: { title: 'Liste de lecture' }
      },
      {
        path: 'crud/:id',
        component: CrudComponent,
        data: { title: 'Liste de lecture' }
      },
      {
        path: 'gears',
        component: GearsComponent,
        data: { title: 'Graph' }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExamplesRoutingModule {}
