import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CouchbaseProvider } from '../../provider/CouchbaseProvider';
import { Http, ResponseOptionsArgs, Headers } from '@angular/http';
import { toBase64String } from '@angular/compiler/src/output/source_map';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  window: any;
  // args: ResponseOptionsArgs;
  // args2: ResponseOptionsArgs;
  url;
  constructor(public navCtrl: NavController, public couch: CouchbaseProvider, private http: Http) {
    console.log('HomePage');
    // var firstHeaders = new Headers();
    // firstHeaders.append("Access-Control-Allow-Origin", "http://localhost:8080/");
    // this.args = { headers: firstHeaders };

    // var secondHeaders = new Headers();
    // secondHeaders.append("Access-Control-Allow-Origin", "*");
    // this.args2 = { headers: secondHeaders };
  }

  playAudio() {
    this.window = window;
    this.window.cblite.getURL((err, url) => {
      console.log(url);
      this.url = url;
      //let arr = this.url.split('@')[0].split('//')[1].split(':');

      var encodedString = toBase64String(this.url.split('@')[0].split('//')[1]);
      console.log(encodedString); // Outputs: "SGVsbG8gV29ybGQh"

      var headers = new Headers();
      headers.append("Authorization", 'Basic ' + encodedString);
      let args3 = { headers: headers };

      this.http.get(url + "1234", args3)
        .subscribe((res) => { console.log(res); }, err => console.log(err));

      this.http.put(url + "1234", null, args3)
        .subscribe((res) => { console.log(res); }, err => console.log(err));

      var headers2 = new Headers();
      headers2.append("Authorization", 'Basic ' + this.url.split('@')[0].split('//')[1]);
      let args4 = { headers: headers2 };

      this.http.get(url + "1234", args4)
        .subscribe((res) => { console.log(res); }, err => console.log(err));

      this.http.put(url + "1234", null, args4)
        .subscribe((res) => { console.log(res); }, err => console.log(err));
    });

    //"GET", this.databaseUrl + this.databaseName)

    //console.log(this.couch.getUrl());
  }

}
