import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Expense } from "../models/expense";
import { map } from "rxjs/operators";

@Injectable()
export class BudgetManagementService {
  private apiUrl = "http://localhost:3000/expenses";

  constructor(private http: HttpClient) {
    this.fetchExpenses();
  }
  private expensesSubject = new BehaviorSubject<Expense[]>([]);

  getExpenses() {
    return this.expensesSubject.asObservable();
  }

  addExpense(expense: Expense) {
    this.http.post<Expense>(this.apiUrl, expense).subscribe((newExpense) => {
      const updatedExpenses = [...this.expensesSubject.value, newExpense];
      this.expensesSubject.next(updatedExpenses);
    });
  }

  fetchExpenses() {
    // Fetch expenses from the server and update the local list
    this.http.get<Expense[]>(this.apiUrl).subscribe((expenses) => {
      this.expensesSubject.next(expenses);
    });
  }

  deleteExpense(expenseId: number) {
    this.http.delete(`${this.apiUrl}/${expenseId}`).subscribe(() => {
      // Filter out the deleted expense from the local list
      const updatedExpenses = this.expensesSubject.value.filter(
        (expenses) => expenses.id !== expenseId
      );
      this.expensesSubject.next(updatedExpenses);
    });
  }

  getTotalExpenses(): Observable<number> {
    return this.expensesSubject.pipe(
      map((expenses) =>
        expenses.reduce((total, expense) => total + expense.userAmount, 0)
      )
    );
  }
}
