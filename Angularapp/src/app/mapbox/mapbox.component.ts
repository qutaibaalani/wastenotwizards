import { Component, OnInit, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { PostAddressService } from './user-address.service';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { PostListComponent } from '../post-list/post-list.component'; // Adjust the import path based on your project structure

export interface Post {
  id: number;
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
  providers: [DatePipe],
  templateUrl: './mapbox.component.html',
  styleUrls: ['./mapbox.component.css']
})
export class MapBoxComponent implements OnInit {
  loggers: any;
  closestPosts: Post[] = [];
  reservedPosts: Post[] = [];
  thisUser: any;


  private map: mapboxgl.Map;
  private mapContainer: HTMLElement;
  private thisUserid: any;
  private post_id: any;
  private user_address: Address[]; 
  private coordinates: any;

  constructor(private addressService: PostAddressService, 
  private http: HttpClient,
  private componentFactoryResolver: ComponentFactoryResolver,
  private viewContainerRef: ViewContainerRef,
  public datepipe: DatePipe) {let currentDateTime =this.datepipe.transform((new Date), 'MM/dd/yyyy h:mm:ss')}



  getUsernameFromLocalStorage() {
    const storedData = localStorage.getItem('username');
    return storedData
  }

  getTokenFromLocalStorage() {
    const storedData = localStorage.getItem('auth_token')
    return storedData
  }


  ngOnInit() {
    const user = this.getUsernameFromLocalStorage()
    this.thisUser = user
    this.thisUserid = localStorage.getItem('id')
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
      console.log(this.user_address)
      this.initMap(this.user_address, this.coordinates)
      this.fetchAndDisplayClosestPosts(this.user_address)
      this.fetchAndDisplayReservedPosts()
    }, 2000)
  }

  private fetchAndDisplayClosestPosts(user_coor): void {
    this.http.get<Post[]>(`https://waste-not-wizards.onrender.com/api/closePosts?latitude=${user_coor[1]}&longitude=${user_coor[0]}&reservation_status=Open`)
      .subscribe(
        (data) => {
          this.closestPosts = data.slice(0, 10);
          //console.log(this.closestPosts) 
      
        },
        (error) => {
          console.error('Error fetching closest posts:', error);
        }
      );
  }

  private fetchAndDisplayReservedPosts(): void {
    let token = this.getTokenFromLocalStorage()
    let url = 'https://waste-not-wizards.onrender.com/api/reservations/receiver/' + this.thisUserid + '/'
    console.log(url)     

    this.http.get<any>(url, {
      headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token ${token}`
      }
    })
      .subscribe(
        (data) => {
          this.reservedPosts = data
          console.log(this.reservedPosts)
      
        },
        (error) => {
          console.error('Error fetching reserved posts:', error);
        }
      );
  }


  private initMap(user_coordinates, pin_coordinates) {
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

  public reserve(event, id) {
    let token = this.getTokenFromLocalStorage()
    let url = 'https://waste-not-wizards.onrender.com/api/posts/' + id + '/'
    let currentDateTime = this.datepipe.transform((new Date), 'MM/dd/yyyy h:mm:ss');
    let data = {"reservation_status": "Reserved", "reserved_by": this.thisUser}
    let postdata = {"receiver": this.thisUser, "post": id}
    let posturl = 'https://waste-not-wizards.onrender.com/api/reservations/receiver/' + this.thisUserid + '/'

    this.http.patch(url, data, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      }
    }).subscribe(
      res => {
        console.log("working patch!!!!")
    },
    error => {
      console.log("OOOHHH NOOO patch")
    }
    )

    this.http.post(posturl, postdata, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      }
    }).subscribe(
      res => {
        console.log("posturl working!!!!")
    },
    error => {
      console.log("OOOHHH NOOO posturl")
    })
  }
}

