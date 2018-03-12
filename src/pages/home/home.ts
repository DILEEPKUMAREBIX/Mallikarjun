import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { EmployeeInfo } from '../information/employee-info';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  items: any = [];

  constructor(public navCtrl: NavController) {
    this.initializeItems();
  }

  itemSelected(item: any) {
    this.navCtrl.push(EmployeeInfo);
  }

  initializeItems() {
    this.items = ["Emp1", "Emp2", "Emp3", "Emp4", "Emp5", "Emp6", "Emp7", "Emp8", "Emp9"];
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

}
