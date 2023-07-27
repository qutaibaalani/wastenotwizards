// map.component.ts
import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { PostAddressService } from './user-address.service';


export interface PostAddress {
  id: number;
  address: string;
  latitude: number;
  longitude: number;
}

@Component({
  selector: 'app-map',
  templateUrl: './mapbox.component.html',
  styleUrls: ['./mapbox.component.css']
})
export class MapBoxComponent implements OnInit {
  private map: mapboxgl.Map;
  private mapContainer: HTMLElement;
  private addresses: PostAddress[]; // Replace 'any' with your specific address data type

  constructor(private addressService: PostAddressService) {}

  ngOnInit() {
    setTimeout(() => {
    this.addressService.getPostAddresses().subscribe(
      (data) => {
        this.addresses = data;
        this.mapContainer = document.getElementById('map')
        this.initMap();
      }
    );
  }, 2000);
  }

  private initMap() {
    (mapboxgl as any).accessToken = 'pk.eyJ1IjoibWVhZ2FucnViaW5vIiwiYSI6ImNsa2QweHh0czBzbzMzanBoamxlNWYwN3EifQ.Z1_FaWyOr3_mK9ErWinJFw';
    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [43.02157, -74.10025], // Set the initial center of the map
      zoom: 10 // Set the initial zoom level of the map
    });
  


    // Add map markers based on addresses
    this.addresses.forEach((address) => {
      const { longitude, latitude } = address;
      new mapboxgl.Marker()
        .setLngLat([longitude, latitude])
        .addTo(this.map);
    });
  }
}