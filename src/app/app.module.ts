import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from "./app-routing.module";
import { AuthService } from "./core/services/auth.service";
import { ForgotPasswordModule } from "./main/components/pages/forgot-password/forgot-password.module";
import { LoginModule } from "./main/components/pages/login/login.module";
import { RegisterModule } from "./main/components/pages/register/register.module";
import { BudgetModule } from "./main/components/pages/sidebar/budget/budget.module";
import { DashboardModule } from "./main/components/pages/sidebar/dashboard.module";

// **component imports
import { MatDialogModule } from "@angular/material/dialog";
import { AppComponent } from "./app.component";
import { AuthGuard } from "./core/auth/auth.guard";
import { FooterComponent } from "./main/components/layout/footer/footer.component";
import { HeaderComponent } from "./main/components/layout/header/header.component";
import { SidebarComponent } from './main/components/layout/sidebar/sidebar.component';
import { HomeComponent } from "./main/components/pages/home/home.component";
import { ConfirmationDialogComponent } from './main/components/shared/confirmation-dialog/confirmation-dialog.component';

@NgModule({
  declarations: [AppComponent, HeaderComponent, FooterComponent, HomeComponent, SidebarComponent, ConfirmationDialogComponent],
  imports: [
    ToastrModule.forRoot(),
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    LoginModule,
    RegisterModule,
    ForgotPasswordModule,
    DashboardModule,
    BudgetModule,
    CommonModule,
    MatDialogModule
  ],

  providers: [AuthService,AuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
