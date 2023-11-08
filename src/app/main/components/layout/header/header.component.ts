import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { AuthService } from "../../../../core/services/auth.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})

export class HeaderComponent implements OnInit {
  constructor(private router: Router, public authService: AuthService) {}
  isLoggedIn: boolean = false;
  private authStatusSubscription: Subscription;

  ngOnInit() {
    this.authStatusSubscription = this.authService
      .getIsLoggedIn()
      .subscribe((isLoggedIn: boolean) => {
        this.isLoggedIn = isLoggedIn;
     });
  }

  logout() {
    this.authService.logoutUser();
    this.router.navigate(["/"]);
  }

  ngOnDestroy() {
    // Unsubscribe from the observable to avoid memory leaks
    this.authStatusSubscription.unsubscribe();
  }
}
