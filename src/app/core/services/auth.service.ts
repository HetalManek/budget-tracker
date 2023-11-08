import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Router } from "@angular/router";

@Injectable()
export class AuthService {
  constructor(private router: Router) {}
  private isLoggedIn = new BehaviorSubject<boolean>(
    this.getInitialLoggedInState()
  );

  private getInitialLoggedInState(): boolean {
    const storedValue = localStorage.getItem("isLoggedIn");
    if (storedValue) {
      this.router.navigate(["/dashboard/budget"]);
    }
    return storedValue ? JSON.parse(storedValue) : false;
  }

  logoutUser() {
    localStorage.setItem("isLoggedIn", "false");
    this.isLoggedIn.next(false);
  }

  loginUser() {
    localStorage.setItem("isLoggedIn", "true");
    this.isLoggedIn.next(true);
  }

  getIsLoggedIn() {
    return this.isLoggedIn.asObservable();
  }
}
