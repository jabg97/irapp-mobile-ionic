import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LocationTrackerProvider } from '../../providers/location-tracker/location-tracker';
import { ConfigProvider } from '../../providers/config/config';

/**
 * Generated class for the ConfigPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-config',
  templateUrl: 'config.html',
})
export class ConfigPage {

  constructor(public locationTracker: LocationTrackerProvider,public navCtrl: NavController,public config: ConfigProvider) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConfigPage');
  }
}
