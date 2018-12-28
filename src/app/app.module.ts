import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule, RouteReuseStrategy, Routes } from "@angular/router";

import { IonicModule, IonicRouteStrategy } from "@ionic/angular";
import { IonicStorageModule } from "@ionic/storage";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";

import { Facebook } from "@ionic-native/facebook/ngx";
import { GooglePlus } from "@ionic-native/google-plus/ngx";
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFireDatabaseModule } from "@angular/fire/database";
import { Firebase } from '@ionic-native/firebase/ngx';
import { FcmService } from "./services/fcm.service";

import { ScheduleDetailPageModule } from './pages/schedule-detail/schedule-detail.module';

// firebase auth config
import { firebaseConfig } from "../../firebase.auth";

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    ScheduleDetailPageModule
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    Firebase,
    FcmService,
    Facebook
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
