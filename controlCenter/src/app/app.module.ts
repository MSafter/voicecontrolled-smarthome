import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppComponent} from './app.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {MatToolbarModule, MatCardModule, MatIconModule, MatRippleModule} from '@angular/material';
import {AppRoutingModule} from "./app-routing.module";
import {FlexLayoutModule} from '@angular/flex-layout';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent
  ],
  imports: [
    BrowserAnimationsModule,
    AppRoutingModule,
    MatIconModule,
    FlexLayoutModule,
    MatRippleModule,
    MatToolbarModule,
    MatCardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
