import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { BudgetManagementService } from 'src/app/core/services/budget-management.service';
import { AddExpenseFormComponent } from './add-expense-form/add-expense-form.component'; // Import FormsModule here
import { BudgetComponent } from './budget.component';
import { ExpenseListComponent } from './expense-list/expense-list.component';
import { SetBudgetFormComponent } from './set-budget-form/set-budget-form.component';

const routes: Routes = [
  { path: '', component: BudgetComponent,
    children: [
    { path: '', component: AddExpenseFormComponent },
    { path: '', component: ExpenseListComponent },
    { path: '', component: SetBudgetFormComponent }
  ]}
];

@NgModule({
  declarations: [BudgetComponent, AddExpenseFormComponent,ExpenseListComponent, SetBudgetFormComponent],
  imports: [RouterModule.forChild(routes),FormsModule,ReactiveFormsModule,CommonModule,HttpClientModule],
  providers: [BudgetManagementService],
})
export class BudgetModule { }
