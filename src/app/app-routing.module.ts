import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "./core/auth/auth.guard";

// **component imports
import { HomeComponent } from "../app/main/components/pages/home/home.component";

const routes: Routes = [
  { path: "", component: HomeComponent },
  {
    path: "dashboard",
    canActivate: [AuthGuard],
    loadChildren: () =>
      import("./main/components/pages/sidebar/dashboard.module").then(
        (m) => m.DashboardModule
      ),
  },
  {
    path: "profile",
    canActivate: [AuthGuard],
    loadChildren: () =>
      import("../app/main/components/pages/profile/profile.module").then(
        (m) => m.ProfileModule
      ),
  },
  {
    path: "login",
    loadChildren: () =>
      import("../app/main/components/pages/login/login.module").then(
        (m) => m.LoginModule
      ),
  },
  {
    path: "register",
    loadChildren: () =>
      import("../app/main/components/pages/register/register.module").then(
        (m) => m.RegisterModule
      ),
  },
  {
    path: "forgot-password",
    loadChildren: () =>
      import(
        "../app/main/components/pages/forgot-password/forgot-password.module"
      ).then((m) => m.ForgotPasswordModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
