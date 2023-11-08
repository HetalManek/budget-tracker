import { ChangeDetectorRef, Component } from "@angular/core";
import { Subscription } from "rxjs";
import { BudgetManagementService } from "src/app/core/services/budget-management.service";

@Component({
  selector: "app-budget",
  templateUrl: "./budget.component.html",
  styleUrls: ["./budget.component.scss"],
})

export class BudgetComponent {
  budget = { totalAmount: 0 }; 
  newBudget: number;
  totalExpenses: number;
  remainingBalance: number;
  private totalExpensesSubscription: Subscription;
  constructor(private budgetService: BudgetManagementService,private cdr: ChangeDetectorRef ) {}

  ngOnInit(){
    this.totalExpensesSubscription = this.budgetService
      .getTotalExpenses()
      .subscribe((totalExpenses) => {
        this.totalExpenses = totalExpenses;
        this.calculateRemainingBalance();
        this.cdr.detectChanges();
      });
  }

  updateBudget(newBudget: number) {
    this.budget.totalAmount = newBudget;
    this.calculateRemainingBalance();
    this.cdr.detectChanges();
  }

  calculateRemainingBalance() {
    this.remainingBalance = this.budget.totalAmount - this.totalExpenses;
  }

  ngOnDestroy() {
    // Unsubscribe from the totalExpenses observable to prevent memory leaks
    this.totalExpensesSubscription.unsubscribe();
  }
}
