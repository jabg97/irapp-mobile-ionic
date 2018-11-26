import { IonicPage,NavController, Platform, ViewController } from 'ionic-angular';
import { Component, ElementRef, ViewChild, NgZone } from '@angular/core';
import { GoogleMapsProvider } from '../../providers/google-maps/google-maps';
import { LocationTrackerProvider } from '../../providers/location-tracker/location-tracker';
import { ConfigProvider } from '../../providers/config/config';
import { AlertController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
/**
 * Generated class for the MapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

declare var google;

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {

  @ViewChild('map') mapElement: ElementRef;
  @ViewChild('pleaseConnect') pleaseConnect: ElementRef;


  latitude: number;
  longitude: number;
  autocompleteService: any;
  placesService: any;
  query: string = '';
  places: any = [];
  searchDisabled: boolean;
  saveDisabled: boolean;
  location: any; 
  hilo: any;
  constructor(public navCtrl: NavController, public zone: NgZone,
     public locationTracker: LocationTrackerProvider,
     public maps: GoogleMapsProvider, public platform: Platform,
      public viewCtrl: ViewController,
      public alertCtrl: AlertController,public loadingCtrl: LoadingController
      , public geolocation: Geolocation,public config: ConfigProvider) {
      this.searchDisabled = true;
      this.saveDisabled = true;
  }

  ionViewDidLoad(): void {
    console.log('ionViewDidLoad MapPage');
      this.geolocation.getCurrentPosition().then((position) => {
          this.maps.setInitPosition(position.coords.latitude, position.coords.longitude,"");

      this.maps.init(this.mapElement.nativeElement, this.pleaseConnect.nativeElement).then(() => {

          this.autocompleteService = new google.maps.places.AutocompleteService();
          this.placesService = new google.maps.places.PlacesService(this.maps.map);
          this.searchDisabled = false;

      });

      this.start();
  });

      this.hilo = setInterval(() => {
          this.paint();
        }, 2000);

  }

  
paint(){
  this.maps.updateLocation(this.locationTracker.lat,this.locationTracker.lng);
}

update(){
  this.maps.deleteMarkers();
  this.maps.showMarkers();
}



  selectPlace(place){

      this.places = [];

      let location = {
          lat: null,
          lng: null,
          name: place.name
      };

      this.placesService.getDetails({placeId: place.place_id}, (details) => {

          this.zone.run(() => {

              location.name = details.name;
              location.lat = details.geometry.location.lat();
              location.lng = details.geometry.location.lng();
              this.saveDisabled = false;
             
             if (this.config.follow == true) {
              this.maps.map.setCenter({lat: location.lat, lng: location.lng});
             } 
              

              this.location = location;

          });

      });

  }

  searchPlace(){

      this.saveDisabled = true;

      if(this.query.length > 0 && !this.searchDisabled) {

          let config = {
              types: ['geocode'],
              input: this.query
          }

          this.autocompleteService.getPlacePredictions(config, (predictions, status) => {

              if(status == google.maps.places.PlacesServiceStatus.OK && predictions){

                  this.places = [];

                  predictions.forEach((prediction) => {
                      this.places.push(prediction);
                  });
              }

          });

      } else {
          this.places = [];
      }

  }

  start(){
  this.locationTracker.startTracking();
  }
 
  stop(){
    this.locationTracker.stopTracking();
  }
  

}
