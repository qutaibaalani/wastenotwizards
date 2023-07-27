// map.component.ts
import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { UserAddressService } from './user-address.service';

// Interface for user address model
export interface UserAddress {
  id: number;
  address: string;
  latitude: number;
  longitude: number;
}

@Component({
  selector: 'app-mapbox',
  templateUrl: './mapbox.component.html',
  styleUrls: ['./mapbox.component.css']
})
export class MapBoxComponent implements OnInit {
  map: mapboxgl.Map;
  userAddresses: UserAddress[];

  constructor(private userAddressService: UserAddressService) {}

  ngOnInit() {

    // Initialize the map
    (mapboxgl as any).accessToken = 'pk.eyJ1IjoibWVhZ2FucnViaW5vIiwiYSI6ImNsa2QweHh0czBzbzMzanBoamxlNWYwN3EifQ.Z1_FaWyOr3_mK9ErWinJFw';

    this.map = new mapboxgl.Map({
      container: 'map', 
      style: 'mapbox://styles/mapbox/streets-v11', 
      center: [-78.644257, 35.787743], 
      zoom: 10
    });
  
    console.log(this.map)
    // Fetch user addresses from the Django API
    this.userAddressService.getUserAddresses().subscribe(
      (addresses: UserAddress[]) => {
        this.userAddresses = addresses;
        console.log(addresses)
        this.displayMarkers();
      },
      (error) => {
        console.error('Error fetching user addresses:', error);
      }
    );
  }

  displayMarkers() {
    // Add markers for each user address
    this.userAddresses.forEach((address) => {
      const popup = new mapboxgl.Popup().setText(address.address);
      new mapboxgl.Marker()
        .setLngLat([address.longitude, address.latitude])
        .setPopup(popup)
        .addTo(this.map);
    });
  }
}
