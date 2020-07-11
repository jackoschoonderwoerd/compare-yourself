import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FlexLayoutModule } from "@angular/flex-layout";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './components/home/home.component';
import { MaterialModule } from './material.module';
import { SideNavComponent } from './components/navigation/side-nav/side-nav.component';
import { FooterComponent } from './components/navigation/footer/footer.component';
import { HeaderComponent } from './components/navigation/header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { SignInComponent } from './components/auth/sign-in/sign-in.component';
import { SignUpComponent } from './components/auth/sign-up/sign-up.component';
import { ShowUsersComponent } from './components/show-users/show-users.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SideNavComponent,
    FooterComponent,
    HeaderComponent,
    SignInComponent,
    SignUpComponent,
    ShowUsersComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // MyLibraryModule.forRoot(),
    FlexLayoutModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
