import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-set-budget-form",
  templateUrl: "./set-budget-form.component.html",
  styleUrls: ["./set-budget-form.component.scss"],
})
export class SetBudgetFormComponent implements OnInit {
  @Output() budgetUpdated: EventEmitter<number> = new EventEmitter<number>();

  newBudget: number;
  errorMessage: string;
  isInitialBudgetSet: boolean = false;
  constructor() {}

  ngOnInit() {
    if (!this.isInitialBudgetSet) {
      const storedBudget = localStorage.getItem("budget");
      if (storedBudget) {
        this.newBudget = parseInt(storedBudget, 10);
        this.budgetUpdated.emit(this.newBudget);
      } else {
        this.newBudget = 0; // Set initial budget to 2000 if no budget is stored in local storage
        localStorage.setItem("budget", this.newBudget.toString());
        this.budgetUpdated.emit(this.newBudget);
      }
      this.isInitialBudgetSet = true;
    }
  }

  onSubmit(form: NgForm) {
    if (form.valid && this.newBudget >= 0) {
      const storedBudget = parseInt(localStorage.getItem("budget"), 10) || 0;

      if (storedBudget === 0) {
        // Set new budget if current budget is 0
        localStorage.setItem("budget", this.newBudget.toString());
        this.budgetUpdated.emit(this.newBudget);
      } else {
        // Add new amount to existing budget
        const updatedBudget = storedBudget + this.newBudget;
        localStorage.setItem("budget", updatedBudget.toString());
        this.budgetUpdated.emit(updatedBudget);
      }

      form.resetForm();
      this.errorMessage = ""; // Clear error message if submission is successful
    } else if (this.newBudget < 0) {
      this.errorMessage =
        "Budget cannot be negative. Please enter a valid amount.";
    } else {
      this.errorMessage = "Invalid budget.";
    }
  }
}
