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
    private date = new Date("03/17/2018");
    private myDate: string = new Date().toISOString();
    private totalValue: number = 0;
    vehicleList: AngularFireList<any>;

    constructor(public navCtrl: NavController,
        private navParams: NavParams,
        private db: AngularFireDatabase,
        private datePipe: DatePipe) {
        this.vehicleList = this.db.list('/vehicles');
    }

    ngOnInit() {
        this.item = this.navParams.get('item');
        let path = 'payments/' + this.item.mobileNumber + "/" + this.datePipe.transform(this.date, "MM-yyyy");
        this.itemsRef = this.db.list(path);

        var items = this.itemsRef.valueChanges();

        items.subscribe(list => {
            if (list.length > 0) {
                var parts = list[list.length - 1].dateOfPayment.split('-');
                var mydate = new Date(+parts[2], +parts[1] - 1, +parts[0]);
                this.item.previousBalance = (new Date().getDate() - mydate.getDate() - 1) * this.item.dailyCollection;
            }
            else {
                this.item.previousBalance = (new Date().getDate() - this.item.startDate.getDate() - 1) * this.item.dailyCollection;
                this.item.previousBalance = +0;
            }
            this.totalValue = +this.item.previousBalance + +this.item.dailyCollection;
        });

    }

    submitPayment(value) {
        this.item.previousBalance = this.totalValue - +value;

        this.vehicleList.update(this.item.key, {
            employeeName: this.item.employeeName,
            mobileNumber: this.item.mobileNumber,
            area: this.item.area,
            startDate: this.item.startDate,
            dailyCollection: this.item.dailyCollection,
            previousBalance: this.item.previousBalance
        });

        this.itemsRef.push({ name: this.item.employeeName, dateOfPayment: this.datePipe.transform(this.date, "dd-MM-yyyy"), amount: value });
        this.navCtrl.pop();
    }
}


