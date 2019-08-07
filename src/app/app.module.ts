import { BrowserModule } from "@angular/platform-browser";
import { ErrorHandler, NgModule } from "@angular/core";
import { IonicApp, IonicErrorHandler, IonicModule } from "ionic-angular";
import { SplashScreen } from "@ionic-native/splash-screen";
import { StatusBar } from "@ionic-native/status-bar";

import { MyApp } from "./app.component";
import { HomePage } from "../pages/home/home";
import { BackgroundMode } from "@ionic-native/background-mode/ngx";
import { CouchbaseProvider } from "../provider/CouchbaseProvider";
import { HttpModule } from "@angular/http";
// import { NativeAudio } from "@ionic-native/native-audio/ngx";

@NgModule({
  declarations: [MyApp, HomePage],
  imports: [BrowserModule, IonicModule.forRoot(MyApp), HttpModule],
  bootstrap: [IonicApp],
  entryComponents: [MyApp, HomePage],
  providers: [
    BackgroundMode,
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    CouchbaseProvider
  ]
})
export class AppModule { }
