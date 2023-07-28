// map.component.ts
import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { PostAddressService } from './user-address.service';
import { HttpClient } from '@angular/common/http';
//import { ClosestPostsComponent, Post } from './post-list.component'; // Adjust the import path based on your project structure


export interface Address {
  latitude: number;
  longitude: number;
  userLat: number;
  userLong: number;
}

@Component({
  selector: 'app-map',
  templateUrl: './mapbox.component.html',
  styleUrls: ['./mapbox.component.css']
})
export class MapBoxComponent implements OnInit {
  private map: mapboxgl.Map;
  private mapContainer: HTMLElement;
  private addresses: Address[]; 

  constructor(private addressService: PostAddressService) {}


  getUsernameFromLocalStorage(): void {
    const storedData = localStorage.getItem('username');
    if (storedData) {
      const data = JSON.parse(storedData);
      return data
    }
  }

  getTokenFromLocalStorage(): void {
    const storedData = localStorage.getItem('token')
    if (storedData){
      const data = JSON.parse(storedData)
      return data
    }else {
      return undefined
    }
  }


  ngOnInit() {

    const user = this.getUsernameFromLocalStorage()
    const token = this.getTokenFromLocalStorage()
    console.log(token)


    this.addressService.getPostAddresses().subscribe(
      (user_info) => {
        console.log(user_info)
        var user_coordinates = [user_info['longitude'], user_info['latitude']]
        this.mapContainer = document.getElementById('map')
        this.initMap(user_coordinates);

      },
      (error) => {
        console.error('Error fetching addresses:', error);
      }
    );

    this.addressService.getUserAddresses(user, token).subscribe(
      (user_info) => {
        this.addresses = [user_info['longitude'], user_info['latitude']];
        console.log(this.addresses)
      }
    )
  }

  private initMap(user_coordinates) {
    (mapboxgl as any).accessToken = 'pk.eyJ1IjoibWVhZ2FucnViaW5vIiwiYSI6ImNsa2QweHh0czBzbzMzanBoamxlNWYwN3EifQ.Z1_FaWyOr3_mK9ErWinJFw';
    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [user_coordinates[0], user_coordinates[1]], // Set the initial center of the map
      zoom: 10 // Set the initial zoom level of the map
    });

    if (this.addresses && Array.isArray(this.addresses)){
    this.addresses.forEach((user_arr) => {

      new mapboxgl.Marker()
        .setLngLat([user_arr[0], user_arr[1]])
        .addTo(this.map);
    });
  } else {console.log(user_coordinates)}
  }

}

