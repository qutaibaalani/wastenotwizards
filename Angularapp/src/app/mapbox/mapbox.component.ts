// map.component.ts
import { Component, OnInit, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { PostAddressService } from './user-address.service';
import { HttpClient } from '@angular/common/http';
import { PostListComponent } from '../post-list/post-list.component'; // Adjust the import path based on your project structure

export interface Post {
  foodlist: string
}

export interface Address {
  user_longitude: number;
  user_latitude: number;
}

export interface post_address {
  pins: Array<any>
}

@Component({
  selector: 'app-map',
  templateUrl: './mapbox.component.html',
  styleUrls: ['./mapbox.component.css']
})
export class MapBoxComponent implements OnInit {
  closestPosts: Post[] = [];
  private map: mapboxgl.Map;
  private mapContainer: HTMLElement;

  private user_address: Address[]; 
  private coordinates: any;

  constructor(private addressService: PostAddressService, 
  private http: HttpClient,
  private componentFactoryResolver: ComponentFactoryResolver,
  private viewContainerRef: ViewContainerRef  ) {}


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

    this.addressService.getUserAddresses(user, token).subscribe(
      (user_info) => {
        this.user_address = [user_info['user_longitude'], user_info['user_latitude']]
      }
    )

    this.addressService.getPostAddresses().subscribe(
      (post_info) => {
        this.coordinates = []
        post_info.forEach((pin)=> {
          this.coordinates.push([pin.longitude, pin.latitude])
        });
      },
      (error) => {
        console.error('Error fetching addresses:', error);
      }
    );
    this.mapContainer = document.getElementById('map')

    setTimeout(() => {
      this.initMap(this.user_address, this.coordinates)
      this.fetchAndDisplayClosestPosts(this.user_address)
    }, 2000)
  }

  private fetchAndDisplayClosestPosts(user_coor): void {
    this.http.get<Post[]>(`https://waste-not-wizards.onrender.com/api/closePosts?latitude=${user_coor[1]}&longitude=${user_coor[0]}`)
      .subscribe(
        (data) => {
          this.closestPosts = data.slice(0, 10);
          console.log(this.closestPosts) 
      
        },
        (error) => {
          console.error('Error fetching closest posts:', error);
        }
      );
  }



  private initMap(user_coordinates, pin_coordinates) {
    console.log(user_coordinates);
    (mapboxgl as any).accessToken = 'pk.eyJ1IjoibWVhZ2FucnViaW5vIiwiYSI6ImNsa2QweHh0czBzbzMzanBoamxlNWYwN3EifQ.Z1_FaWyOr3_mK9ErWinJFw';
    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: new mapboxgl.LngLat(user_coordinates[0], user_coordinates[1]), // Set the initial center of the map
      zoom: 10 // Set the initial zoom level of the map
    });

    if (pin_coordinates && Array.isArray(pin_coordinates)){
    pin_coordinates.forEach((pin_arr) => {
      var long = pin_arr[0]
      var lat = pin_arr[1]
      new mapboxgl.Marker()
        .setLngLat([long, lat])
        .addTo(this.map);
    });
  } else {console.log("user_coordinates")}
  }
}
