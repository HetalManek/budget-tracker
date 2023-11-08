import { Component } from "@angular/core";
import { AuthService } from "./core/services/auth.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  constructor(private authService: AuthService) {}
  title = "budget-tracker";
  isLoggedIn: boolean = false;
  private authStatusSubscription: Subscription;

  ngOnInit() {
    this.authStatusSubscription = this.authService
      .getIsLoggedIn()
      .subscribe((isLoggedIn: boolean) => {
        this.isLoggedIn = isLoggedIn;
      });
  }

  ngOnDestroy() {
    // Unsubscribe from the observable to avoid memory leaks
    this.authStatusSubscription.unsubscribe();
  }
}
