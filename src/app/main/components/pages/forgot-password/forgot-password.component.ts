import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-forgot-password",
  templateUrl: "./forgot-password.component.html",
  styleUrls: ["./forgot-password.component.scss"],
})
export class ForgotPasswordComponent implements OnInit {
  user = {
    email: "",
  };

  constructor(private router: Router, private toastr: ToastrService) {}

  ngOnInit() {}
  onSubmit(resetPasswordForm: NgForm) {
    if (resetPasswordForm.valid) {
      this.toastr.success("Mail sent successfully!!.");
      this.router.navigate(["/login"]);
    }
  }
}
