import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../../../../core/services/auth.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  user = {
    email: "",
    password: "",
  };

  constructor(
    private router: Router,
    public authService: AuthService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    if (this.authService.getIsLoggedIn()) {
      if (true) {
        this.router.navigate(["/dashboard"]);
      }
    }
  }

  onSubmit(loginForm: NgForm) {
    if (loginForm.valid) {
      // Check if email and password match the desired values
      if (
        this.user.email === "admin@gmail.com" &&
        this.user.password === "admin@123"
      ) {
        this.toastr.success(
          "Welcome, Admin! You have successfully logged in!!",
          "Success",
          { timeOut: 1000 }
        );
        // Call your authentication service's login method here if necessary
        this.authService.loginUser();
        // Redirect to the dashboard page after successful login
        this.router.navigate(["/dashboard/budget"]);
      } else {
        // Show an error message or handle the invalid login case accordingly
        this.toastr.error(
          "Invalid email or password. Please try again.",
          "Error"
        );
      }
    } else {
      return;
    }
  }
}
