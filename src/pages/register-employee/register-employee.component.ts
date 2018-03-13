import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';

import { FormGroup, FormControl, FormArray, NgForm, Validators } from '@angular/forms';

import { AF } from '../../app/services/af';

import { AngularFireDatabase, AngularFireList } from 'angularfire2/database'

@Component({
    selector: 'reg-employee',
    templateUrl: 'register-employee.component.html'
})
export class RegisterEmployee {

    private myForm: FormGroup;
    myDate: any = new Date();
    vehicleList: AngularFireList<any>;

    constructor(public navCtrl: NavController, private _afDatabase: AngularFireDatabase) {
        this.vehicleList = this._afDatabase.list('/vehicles');
    }

    ngOnInit() {
        this.myForm = new FormGroup({
            'employeeName': new FormControl('', Validators.required),
            'mobileNumber': new FormControl('', Validators.required),
            'area': new FormControl('', Validators.required),
            'startDate': new FormControl(new Date(), Validators.required),
            'dailyCollection': new FormControl('', Validators.required)
        });
    }

    registerEmployee(vehicleData: any) {
        this.vehicleList.push({
            employeeName: vehicleData.value.employeeName,
            mobileNumber: vehicleData.value.mobileNumber,
            area: vehicleData.value.area,
            startDate: vehicleData.value.startDate,
            dailyCollection: vehicleData.value.dailyCollection
        }).then(newContact => {
            this.navCtrl.pop();
        }, error => {
            console.log(error);
        });
    }

}


