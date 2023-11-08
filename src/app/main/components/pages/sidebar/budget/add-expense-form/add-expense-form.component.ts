import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Expense } from "../../../../../../core/models/expense";
import { BudgetManagementService } from "../../../../../../core/services/budget-management.service";

@Component({
  selector: "app-add-expense-form",
  templateUrl: "./add-expense-form.component.html",
  styleUrls: ["./add-expense-form.component.scss"],
})
export class AddExpenseFormComponent implements OnInit {

  @Input() remainingBalance: number;
  expenseForm: FormGroup;
  insufficientBalance: boolean = false;
  constructor(
    private fb: FormBuilder,
    private budgetService: BudgetManagementService
  ) {}

  ngOnInit() {
    this.expenseForm = this.fb.group({
      productTitle: ["", Validators.required],
      userAmount: [null, [Validators.required, Validators.min(0.01)]],
    });
  }

  // onSubmitExpense() {
  //   if (this.expenseForm.valid) {
  //     const { productTitle, userAmount } = this.expenseForm.value;
  //     const expense: Expense = {
  //       productTitle: productTitle,
  //       userAmount: userAmount,
  //       id: 0,
  //     };

  //     this.budgetService.addExpense(expense);
  //     this.expenseForm.reset();
  //   }
  // }

  onSubmitExpense() {
    if (this.expenseForm.valid) {
      const { productTitle, userAmount } = this.expenseForm.value;

      // Check if the entered expense exceeds the remaining balance
      if (userAmount > this.remainingBalance) {
        this.insufficientBalance = true; // Set flag to true if there is insufficient balance
      } else {
        this.insufficientBalance = false; // Reset the flag if there is sufficient balance

        const expense: Expense = {
          productTitle: productTitle,
          userAmount: userAmount,
          id: 0,
        };
        this.budgetService.addExpense(expense);
        this.expenseForm.reset();
      }
    }
  }
}
