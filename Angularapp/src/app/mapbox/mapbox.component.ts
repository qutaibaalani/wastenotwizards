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

      },
      (error) => {
        console.error('Error fetching addresses:', error);
      }
    );
  }, 2000);
  }

  private initMap() {
    (mapboxgl as any).accessToken = 'sk.eyJ1IjoiZXhvMzAiLCJhIjoiY2xra21rMHJvMDM0NDNqbzVuNXQ5M3l4ciJ9.-g5BHTGRGDy1DT9wfrGfNQ';
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