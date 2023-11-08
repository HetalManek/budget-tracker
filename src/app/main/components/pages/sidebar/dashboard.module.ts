import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { BudgetComponent } from './budget/budget.component';
import { dashboardComponent } from './dashboard.component';
import { CommonModule } from '@angular/common';

const routes: Routes = [
    {
      path: '',
      component: dashboardComponent,
      children: [
        {
          path: 'budget',
          component: BudgetComponent,
        },
        // Other child routes can be added here
      ],
    },
  ];
  

@NgModule({
  declarations: [dashboardComponent],
  imports: [RouterModule.forChild(routes),FormsModule, CommonModule,],
})
export class DashboardModule { }
