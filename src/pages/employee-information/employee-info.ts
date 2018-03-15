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
    private toDate = new Date("03/20/2018");
    private myDate: string;
    private totalValue: number = 0;
    private previousBalance: number = 0;
    vehicleList: AngularFireList<any>;

    constructor(public navCtrl: NavController,
        private navParams: NavParams,
        private db: AngularFireDatabase,
        private datePipe: DatePipe) {
        this.vehicleList = this.db.list('/vehicles');
    }

    ngOnInit() {
        this.item = this.navParams.get('item');
        let path = 'payments/' + this.item.mobileNumber + "/" + this.datePipe.transform(this.toDate, "MM-yyyy");
        this.itemsRef = this.db.list(path);
        this.myDate = this.datePipe.transform(this.toDate, "dd-MM-yyyy");
        var items = this.itemsRef.valueChanges();

        items.subscribe(list => {
            if (list.length > 0) {
                var parts = list[list.length - 1].dateOfPayment.split('-');
                var mydate = new Date(+parts[2], +parts[1] - 1, +parts[0]);
                this.previousBalance = this.item.previousBalance + (this.toDate.getDate() - 1 - mydate.getDate()) * this.item.dailyCollection;
            }
            else {
                var parts = this.item.startDate.split('-');
                var startDate = new Date(+parts[0], +parts[1] - 1, +parts[2]);
                this.previousBalance = (this.toDate.getDate() - startDate.getDate()) * this.item.dailyCollection;
            }
            this.totalValue = +this.previousBalance + +this.item.dailyCollection;
        });
    }

    submitPayment(value) {
        this.item.previousBalance = this.totalValue - +value;
        this.vehicleList.update(this.item.key, {
            previousBalance: this.item.previousBalance
        });

        this.itemsRef.push({
            name: this.item.employeeName,
            dateOfPayment: this.datePipe.transform(this.toDate, "dd-MM-yyyy"),
            amount: value,
            previousBalance: this.item.previousBalance
        });
        this.navCtrl.pop();
    }

    decreaseDate() {
        this.toDate.setDate(this.toDate.getDate() - 1);
        this.myDate = this.datePipe.transform(this.toDate, "dd-MM-yyyy");

        let path = 'payments/' + this.item.mobileNumber + "/" + this.datePipe.transform(this.toDate, "MM-yyyy");
        this.itemsRef = this.db.list(path);
        var items = this.itemsRef.valueChanges();

        items = items.map(projects =>
            projects.filter(proj => proj.dateOfPayment.toLowerCase().indexOf(this.myDate.toLowerCase()) > -1));

            items.subscribe( list => {
                console.log(list);
            });

        console.log(this.myDate);
    }

    increaseDate() {
        this.toDate.setDate(this.toDate.getDate() + 1);
        this.myDate = this.datePipe.transform(this.toDate, "dd-MM-yyyy");
        console.log(this.myDate);
    }

    selectToDate() {
        this.toDate = new Date();
        this.myDate = this.datePipe.transform(this.toDate, "dd-MM-yyyy");
    }
}


