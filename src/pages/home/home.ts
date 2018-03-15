import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { EmployeeInfo } from '../employee-information/employee-info';
import { RegisterEmployee } from '../register-employee/register-employee.component';
import { Observable } from 'rxjs/Observable';
import { LoadingController } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database'


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  loader: any;

  vehiclesRef: AngularFireList<any>;
  vehicles: Observable<any[]>;

  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController,
    private _afDatabase: AngularFireDatabase, ) {
    this.vehiclesRef = this._afDatabase.list('vehicles');

    this.loader = this.loadingCtrl.create({
      content: "Please wait...",
    });
    this.loader.present();

    this.initializeItems();
  }

  initializeItems() {
    this.vehicles = this.vehiclesRef.snapshotChanges().map(changes => {
      this.loader.dismiss();
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
  }

  getItems(ev: any) {
    this.initializeItems();
    let val = ev.target.value;
    if (val && val.trim() != '') {
      this.vehicles = this.vehicles.map(projects =>
        projects.filter(proj => proj.employeeName.toLowerCase().indexOf(val.toLowerCase()) > -1
          || proj.mobileNumber.indexOf(val.toLowerCase()) > -1));
    }
  }

  itemSelected(item) {
    console.log(item);
    this.navCtrl.push(EmployeeInfo, {
      item: item
    });
  }

  addVehicle() {
    console.log(this.vehicles);
    this.navCtrl.push(RegisterEmployee);
  }

  editVehicle(item) {
    console.log(item);
    this.navCtrl.push(RegisterEmployee, {
      item: item,
      action: "Edit"
    });
  }

  deleteVehicle(key) {
    this.vehiclesRef.remove(key);
  }
}

