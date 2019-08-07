import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { BackgroundMode } from '@ionic-native/background-mode/ngx';
import { CouchbaseProvider } from '../../provider/CouchbaseProvider';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public backgroundMode: BackgroundMode, public couch: CouchbaseProvider) {
    // this.nativeAudio.preloadSimple('audio1', 'audio/1.mp3').then((msg) => {
    //   console.log("message: " + msg);
    // }, (error) => {
    //   console.log("error: " + error);
    // });
    console.log('HomePage');
    couch.startReplication();
  }

  public playAudio() {
    this.backgroundMode.enable();
    this.backgroundMode.on("activate").subscribe(() => {
      //this.nativeAudio.play("audio1");
      console.log('audio1 is done playing');
    });
    //this.nativeAudio.play("audio1", () => console.log('audio1 is done playing'));
    console.log('outside')
  }

}
