import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
    selector: 'employee-info',
    templateUrl: 'employee-info.html'
})
export class EmployeeInfo {
    item: any;
    public myDate: string = new Date().toISOString();
    constructor(public navCtrl: NavController, private navParams: NavParams) {

    }

    ngOnInit() {
        this.item = this.navParams.get('item');
    }

}


