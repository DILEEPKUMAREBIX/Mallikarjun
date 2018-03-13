import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { EmployeeInfo } from '../employee-information/employee-info';
import { RegisterEmployee } from '../register-employee/register-employee.component';

import { AF } from '../../app/services/af';
import { LoadingController } from 'ionic-angular';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  items: any = [];
  vehicles: any = [];
  loader: any

  constructor(public navCtrl: NavController, private _afService: AF, public loadingCtrl: LoadingController) {

    this.loader = this.loadingCtrl.create({
      content: "Please wait...",
    });
    this.loader.present();

    this._afService.messages.subscribe(
      (vehicles) => {
        this.items = vehicles;
        this.initializeItems();
        this.loader.dismiss();
      }
    );
  }

  initializeItems() {
    this.vehicles = [];
    this.vehicles = this.items;
  }

  getItems(ev: any) {
    this.initializeItems();
    let val = ev.target.value;
    if (val && val.trim() != '') {
      this.vehicles = this.vehicles.filter((item) => {
        return (item.employeeName.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  itemSelected(item: any) {
    this.navCtrl.push(EmployeeInfo, {
      item: item
    });
  }

  addEmployee() {
    this.navCtrl.push(RegisterEmployee);
  }

}

export interface Vechicle {
  id: any;
  name: any;
  mobile: any;
  address: any;
}

