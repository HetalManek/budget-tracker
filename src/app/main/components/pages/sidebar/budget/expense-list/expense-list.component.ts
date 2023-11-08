import { Component, OnInit } from "@angular/core";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { Subscription } from "rxjs";
import { BudgetManagementService } from "src/app/core/services/budget-management.service";
import { ConfirmationDialogComponent } from "src/app/main/components/shared/confirmation-dialog/confirmation-dialog.component";

interface Expense {
  productTitle: string;
  userAmount: number;
}

@Component({
  selector: "app-expense-list",
  templateUrl: "./expense-list.component.html",
  styleUrls: ["./expense-list.component.scss"],
})
export class ExpenseListComponent implements OnInit {
  expensesList: Expense[] = [];
  searchTerm: string = "";
  filteredExpenses: Expense[] = [];
  private expensesSubscription: Subscription;

  constructor(
    private budgetService: BudgetManagementService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.getExpenseList();
  }

  getExpenseList() {
    this.expensesSubscription = this.budgetService
      .getExpenses()
      .subscribe((expenses) => {
        this.expensesList = expenses;
        this.filteredExpenses = [...this.expensesList];
      });
  }

  deleteExpense(expenseId: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "300px"; // Set the width of the dialog
    dialogConfig.position = { top: "20px", right: "20px" };
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: { message: "Are you sure you want to delete this expense?" },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.budgetService.deleteExpense(expenseId);
        this.getExpenseList();
      }
    });
  }

  filter() {
    if (this.searchTerm.trim() === "") {
      this.filteredExpenses = [...this.expensesList]; // Reset the filter if search term is empty
    } else {
      this.filteredExpenses = [
        ...this.expensesList.filter((expense) =>
          expense.productTitle
            .toLowerCase()
            .includes(this.searchTerm.toLowerCase())
        ),
      ];
    }
  }

  ngOnDestroy() {
    // Unsubscribe from the expenses observable to prevent memory leaks
    this.expensesSubscription.unsubscribe();
  }
}
