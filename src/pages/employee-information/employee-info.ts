import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { DatePipe } from '@angular/common';
import * as firebase from 'firebase/app';


@Component({
    selector: 'employee-info',
    templateUrl: 'employee-info.html'
})
export class EmployeeInfo {
    private item: any;
    private itemsRef: AngularFireList<any>;
    private items: Observable<any[]>;
    private date = new Date("03/14/2018");
    private myDate: string = new Date().toISOString();
    private totalValue: number = 0;

    constructor(public navCtrl: NavController,
        private navParams: NavParams,
        private db: AngularFireDatabase,
        private datePipe: DatePipe) {

    }

    ngOnInit() {
        this.item = this.navParams.get('item');
        let path = 'payments/' + this.item.mobileNumber + "/" + this.datePipe.transform(this.date, "MM-yyyy");
        this.itemsRef = this.db.list(path);

        var items = this.itemsRef.valueChanges();

        items.subscribe(list => {
            var total: number = 0;
            for (var i = 0; i < list.length; i++) {
                total += +list[i].amount;
            }

            this.item.previousBalance = (new Date().getDate() - 1) * this.item.dailyCollection - total;

            this.totalValue = +this.item.previousBalance + +this.item.dailyCollection;
            console.log(path);
        });

        // if (this.item.previousBalance == undefined) {
        //     this.item.previousBalance = 0;
        // }


    }

    submitPayment(value) {
        this.itemsRef.push({ name: this.item.employeeName, dateOfPayment: this.datePipe.transform(this.date, "dd-MM-yyyy"), amount: value });
        this.navCtrl.pop();
    }
}


