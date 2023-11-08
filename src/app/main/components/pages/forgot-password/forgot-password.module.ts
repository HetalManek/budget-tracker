import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { ForgotPasswordComponent } from "./forgot-password.component";
import { CommonModule } from "@angular/common";

const routes: Routes = [{ path: "", component: ForgotPasswordComponent }];

@NgModule({
  declarations: [ForgotPasswordComponent],
  imports: [RouterModule.forChild(routes), FormsModule, CommonModule],
})
export class ForgotPasswordModule {}
