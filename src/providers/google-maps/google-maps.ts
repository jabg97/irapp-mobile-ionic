import { Injectable } from '@angular/core';
import { ConnectivityServiceProvider } from '../connectivity-service/connectivity-service';


/*
  Generated class for the GoogleMapsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
declare var google; 
@Injectable()
export class GoogleMapsProvider {
  public lat: number = 0;
  public lng: number = 0;
  public user: string = "usuario";
    mapElement: any;
    pleaseConnect: any;
    map: any;
    mapInitialised: boolean = false;
    mapLoaded: any;
    mapLoadedObserver: any;
    currentMarker: any;
    apiKey: string = "AIzaSyDShqXOrTD_donWeWH4OJQwefouQ1mGbz8";

    markers: any[]= [];
    map_markers: any[]= [];
    markerGPS: any;

   //AIzaSyDShqXOrTD_donWeWH4OJQwefouQ1mGbz8
    constructor(public connectivityService: ConnectivityServiceProvider) {
       console.log('Hello GoogleMapsProvider Provider');
       console.log(this.markers);
  }

  initMarker(latLng: any){
    let image = '../assets/imgs/pin.png';

    this.markerGPS = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.BOUNCE,
      icon: image,
      position: latLng
    });
   
    let content = "<h4>"+this.user+"</h4>";         
   
    this.addInfoWindow(this.markerGPS, content);
   
  }

  addMarker(){
    let image = '../assets/imgs/goal.png';  
    let content = "<h4>Information!</h4>";         
    this.markers.push([this.map.getCenter(), content,image]);
  }

  addInfoWindow(marker, content){
 
    let infoWindow = new google.maps.InfoWindow({
      content: content
    });
   
    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });
   
  }


// Shows any markers currently in the array.
showMarkers() {
  let marker;
    for (var i = 0; i < this.markers.length; i++) {
      marker = new google.maps.Marker({
        map: this.map,
        animation: google.maps.Animation.BOUNCE,
        icon: this.markers[i][2],
        position: this.markers[i][0]
      });
      this.addInfoWindow(marker, this.markers[i][1]);
      this.map_markers.push(marker);
    }
}

// Deletes all markers in the array by removing references to them.
deleteMarkers() {
  while(this.map_markers.length) { 
    this.map_markers.pop().setMap(null);
   }
}
  
  init(mapElement: any, pleaseConnect: any): Promise<any> {
 
    this.mapElement = mapElement;
    this.pleaseConnect = pleaseConnect;
 
    return this.loadGoogleMaps();
 
  }
 
  loadGoogleMaps(): Promise<any> {
 
    return new Promise((resolve) => {
 
      if(typeof google == "undefined" || typeof google.maps == "undefined"){
 
        console.log("Google maps JavaScript necesita ser cargado.");
        this.disableMap();
 
        if(this.connectivityService.isOnline()){
 
          window['mapInit'] = () => {
 
            this.initMap().then(() => {
              resolve(true);
            });
 
            this.enableMap();
          }
 
          let script = document.createElement("script");
          script.id = "googleMaps";
 
          if(this.apiKey){
            script.src = 'http://maps.google.com/maps/api/js?key=' + this.apiKey + '&callback=mapInit&libraries=places';
          } else {
            script.src = 'http://maps.google.com/maps/api/js?callback=mapInit';      
          }
 
          document.body.appendChild(script); 
 
        }
      } else {
 
        if(this.connectivityService.isOnline()){
          this.initMap();
          this.enableMap();
        }
        else {
          this.disableMap();
        }
 
        resolve(true);
 
      }
 
      this.addConnectivityListeners();
 
    });
 
  }

  
  initMap(): Promise<any> {
 
    this.mapInitialised = true;
 
    return new Promise((resolve) => {
 
     
 
        let latLng = new google.maps.LatLng(this.lat, this.lng);
 
        let mapOptions = {
          center: latLng,
          zoom: 15,
          panControl: true,
          zoomControl: true,
          mapTypeControl: true,
          scaleControl: true,
          streetViewControl: true,
          overviewMapControl: true,
          rotateControl: true,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        }
 
        this.map = new google.maps.Map(this.mapElement, mapOptions);
        
        resolve(true);
        
 
      });

  }
 
  disableMap(): void {
 
    if(this.pleaseConnect){
      this.pleaseConnect.style.display = "block";
    }
 
  }
 
  enableMap(): void {
 
    if(this.pleaseConnect){
      this.pleaseConnect.style.display = "none";
    }

      let latLng = new google.maps.LatLng(this.lat, this.lng);
      this.initMarker(latLng);
   
  }
 
  addConnectivityListeners(): void {
 
    this.connectivityService.watchOnline().subscribe(() => {
 
      setTimeout(() => {
 
        if(typeof google == "undefined" || typeof google.maps == "undefined"){
          this.loadGoogleMaps();
        }
        else {
          if(!this.mapInitialised){
            this.initMap();
              let latLng = new google.maps.LatLng(this.lat, this.lng);
              this.initMarker(latLng);
          }
 
          this.enableMap();
        }
 
      }, 2000);
 
    });
 
    this.connectivityService.watchOffline().subscribe(() => {
 
      this.disableMap();
 
    });
 
  }


  updateLocation(lat,lng): void {
    this.markerGPS.setMap(null);
    this.lat = lat;
    this.lng = lng;
    let latLng = new google.maps.LatLng(this.lat, this.lng);
    let image = '../assets/imgs/pin.png';

    this.markerGPS = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.BOUNCE,
      icon: image,
      position: latLng
    });
   
    let content = "<h4>"+this.user+"</h4>";         
   
    this.addInfoWindow(this.markerGPS, content);

    this.map.setCenter({lat: this.lat, lng: this.lng});
   }
  setInitPosition(lat,lng,user): void {
 
   this.lat = lat;
   this.lng = lng;
   this.user = user;
  }
 

}
