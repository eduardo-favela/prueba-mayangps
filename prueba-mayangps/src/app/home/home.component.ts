import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { LoginService } from '../services/login.service';
import { latLng, MapOptions, tileLayer, Map, Marker, icon, LatLng } from 'leaflet';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private loginService: LoginService) { }

  sessionStorage = sessionStorage
  latlngmap = latLng(51.505, 0)

  map!: Map;
  mapOptions!: MapOptions;

  ngOnInit(): void {
    this.initializeMapOptions();
  }

  onMapReady(map: Map) {
    this.map = map;
  }

  initializeMapOptions() {
    this.mapOptions = {
      center: this.latlngmap,
      zoom: 15,
      layers: [
        tileLayer(
          'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
          {
            maxZoom: 18
          })
      ],
    };
  }

  addSampleMarker(position: any) {
    let fecha = new Date()
    const marker = new Marker([position.lat, position.lng])
      .bindPopup(`Ubicación actual: ${position.lat}, ${position.lng}
      Fecha/hora de consulta: ${fecha.getDate().toString()}/${((fecha.getMonth() + 1) <= 9 ? ('0' + (fecha.getMonth() + 1).toString()) : (fecha.getMonth() + 1).toString())}/${fecha.getFullYear().toString()} ${fecha.getHours().toString()}:${fecha.getMinutes().toString()}`)
      .setIcon(
        icon({
          iconSize: [25, 41],
          iconAnchor: [13, 41],
          iconUrl: 'assets/marker-icon.png'
        }));
    marker.addTo(this.map);
  }

  locatePosition() {
    navigator.geolocation.getCurrentPosition((position) => {
      const longitude = position.coords.longitude;
      const latitude = position.coords.latitude;
      this.latlngmap = latLng(latitude, longitude)
      this.addSampleMarker({ lat: latitude, lng: longitude });
      this.changeMapPosition()
    });
  }

  changeMapPosition() {
    this.map.flyTo(this.latlngmap)
  }
}
