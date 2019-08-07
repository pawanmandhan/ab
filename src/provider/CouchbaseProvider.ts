import { Http } from '@angular/http';
import { Observable } from 'rxjs'
import { Injectable } from '@angular/core';
import { Database } from "cordova-couchbase/core";
import { Platform } from 'ionic-angular';
import { CouchbaseLite } from '@ionic-native/couchbase-lite';

@Injectable()
export class CouchbaseProvider {
    public database: Database;
    constructor(public platform: Platform, private _http: Http, public couchbase: CouchbaseLite) {
        console.log('CouchbaseProvider')
        //    this.initMethod();
        console.log('CouchbaseProvider')
    }
    url: string;//= "http://192.168.43.238:4984/"
    results: string;

    // public startReplication() {

    //     console.log('in startReplication of provider');

    //     let LOCAL_DB_NAME =  '9211111875';

    //     this.platform.ready().then(() => {
    //         let couch = new Couchbase();
    //         couch.openDatabase(LOCAL_DB_NAME).then(database => {
    //             this.database = database;
    //             console.log({ msg: 'db created successfully', db: database });
    //         }, error => {
    //             console.error({ errorMsg: error });
    //         });

    //     }, error => {
    //         console.error({ errorMsg: error });
    //         return false;
    //     });

    //     return true;
    // }


    initMethod() {
        this.platform.ready().then(() => {
            this.couchbase.getURL().then((url) => {
                this.url = url;
                this.createDatabase("red");

            });
            console.log('initMethod');
        }, error => {
            console.error({ errorMsg: error });
            return false;
        });
    }
    getUrl() {
        return this.url;
    }
    // DATABASES //
    createDatabase(database_name: string) {
        let url = this.getUrl();
        url = url + database_name;
        return this._http
            .put(url, {})
            .map(data => { this.results = data['results'] })
            .catch((error: any) => {
                return Observable.throw(error.json() || 'Couchbase Lite error');
            })
    }
    deleteDatabase(database_name: string) {
        let url = this.getUrl();
        url = url + database_name;
        return this._http
            .delete(url)
            .map(data => { this.results = data['results'] })
            .catch((error: any) => {
                return Observable.throw(error.json() || 'Couchbase Lite error');
            })
    }
    getAllDbs() {
        let url = this.getUrl();
        url = url + '_all_dbs';
        return this._http
            .get(url)
            .map(data => { this.results = data['results'] })
            .catch((error: any) => {
                return Observable.throw(error.json() || 'Couchbase Lite error');
            })
    }
    // DOCUMENTS //
    getAllDocuments(database_name: string) {
        let url = this.getUrl();
        // include_docs=true will include a doc inside response, it is false by default
        url = url + database_name + '/_all_docs?include_docs=true';
        return this._http
            .get(url)
            .map(data => { this.results = data['results'] })
            .catch((error: any) => {
                return Observable.throw(error.json() || 'Couchbase Lite error');
            });
    }
    createDocument(database_name: string, document) {
        let url = this.getUrl();
        url = url + database_name;
        return this._http
            .post(url, document)
            .map(data => { this.results = data['results'] })
            .catch((error: any) => {
                return Observable.throw(error.json() || 'Couchbase Lite error');
            });
    }
    // let document = {
    //     _id: 'You can either specify the document ID (must be string) else couchbase generates one for your doc',
    //     data: { name: 'sandman', age: 25, city: pune }
    // }
    //createDocument('justbe', document);
    // successful response
    //{ "id": "string", "rev": "string", "ok": true }
    updateDocument(database_name: string, document) {
        let url = this.getUrl();
        url = url + database_name + '/' + document._id;
        return this._http
            .put(url, document)
            .map(data => { this.results = data['results'] })
            .catch((error: any) => {
                return Observable.throw(error.json() || 'Couchbase Lite error');
            });
    }
    // for updation of document your document must contain most recent rev(revision) id.
    // for each updation of document new rev id is get generated
    // successful response
    // { "id": "string", "rev": "string(new revision id)", "ok": true }
    deleteDocument(database_name: string, document) {
        let url = this.getUrl();
        url = url + database_name + '/' + document._id + '?rev=';// + doc._rev;
        return this._http
            .delete(url)
            .map(data => { this.results = data['results'] })
            .catch((error: any) => {
                return Observable.throw(error.json() || 'Couchbase Lite error');
            });
    }


}