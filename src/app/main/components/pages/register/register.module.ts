import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RegisterComponent } from "./register.component";
import { CommonModule } from "@angular/common";

const routes: Routes = [{ path: "", component: RegisterComponent }];

@NgModule({
  declarations: [RegisterComponent],
  imports: [
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
  ],
})
export class RegisterModule {}
