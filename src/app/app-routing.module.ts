import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RedmineService } from './redmine/redmine.service';

const routes: Routes = [{ path: '', redirectTo: '/', pathMatch: 'full' }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [RedmineService],
})
export class AppRoutingModule {}
