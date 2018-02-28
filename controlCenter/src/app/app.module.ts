import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppComponent} from './app.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {MatToolbarModule, MatCardModule, MatIconModule, MatRippleModule, MatButtonModule, MatListModule} from '@angular/material';
import {AppRoutingModule} from "./app-routing.module";
import {FlexLayoutModule} from '@angular/flex-layout';
import { OptionListComponent } from './option/option-list/option-list.component';
import {DataService} from "./shared/data.service";
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    OptionListComponent
  ],
  imports: [
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    MatIconModule,
    MatButtonModule,
    FlexLayoutModule,
    MatRippleModule,
    MatListModule,
    MatToolbarModule,
    MatCardModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
