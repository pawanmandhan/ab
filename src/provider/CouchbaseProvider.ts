import { Injectable } from '@angular/core';
import { Couchbase, Database } from "cordova-couchbase/core";

@Injectable()
export class CouchbaseProvider {
    public database: Database;
    url: string;

    constructor() {
        console.log('CouchbaseProvider');
    }

    public startReplication() {
        console.log('in startReplication of provider');
        let LOCAL_DB_NAME = 'pawan';
        let couch = new Couchbase();
        couch.openDatabase(LOCAL_DB_NAME).then(database => {
            this.database = database;
            console.log(database);
            console.log('db created successfully');
            console.log({ msg: 'db created successfully', db: database });
        }, (error) => {
            console.error({ errorMsg: error });
        }).catch((err) => {
            console.error({ msg: 'in catch', errorMsg: err });
        }).finally(() => {
            console.error({ msg: 'in finally' });
        });
    }

    getUrl() {
        return this.database.getUrl();
    }

}