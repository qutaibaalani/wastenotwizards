import { Component, OnInit, ComponentFactoryResolver, ViewContainerRef, ElementRef, ViewChild, Renderer2 } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { PostAddressService } from './user-address.service';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { PostListComponent } from '../post-list/post-list.component'; // Adjust the import path based on your project structure

export interface Post {
  id: number;
  foodlist: string;
  post: any;
}

export interface Address {
  user_longitude: number;
  user_latitude: number;
  id: any;
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

  private target;
  private map: mapboxgl.Map;
  private mapContainer: HTMLElement;
  private thisUserid: any;
  private post_id: any;
  private user_address: Address[];
  private coordinates: any;

  dynamicDivRef: ElementRef;

  constructor(
    private addressService: PostAddressService,
    private http: HttpClient,
    private componentFactoryResolver: ComponentFactoryResolver,
    private viewContainerRef: ViewContainerRef,
    private renderer: Renderer2,
    public datepipe: DatePipe
  ) {}

  getUsernameFromLocalStorage() {
    const storedData = localStorage.getItem('username');
    return storedData;
  }

  getTokenFromLocalStorage() {
    const storedData = localStorage.getItem('auth_token');
    return storedData;
  }

  ngOnInit() {
    const user = this.getUsernameFromLocalStorage();
    this.thisUser = user;
    this.thisUserid = localStorage.getItem('id');
    const token = this.getTokenFromLocalStorage();

    this.addressService.getUserAddresses(user, token).subscribe(
      (user_info) => {
        this.user_address = [user_info['user_longitude'], user_info['user_latitude']];
      }
    );

    this.addressService.getPostAddresses().subscribe(
      (post_info) => {
        this.coordinates = [];
        post_info.forEach((pin) => {
          this.coordinates.push([pin.longitude, pin.latitude, pin.id]);
        });
      },
      (error) => {
        console.error('Error fetching addresses:', error);
      }
    );

    this.mapContainer = document.getElementById('map');
    setTimeout(() => {
      this.fetchAndDisplayClosestPosts(this.user_address);
      this.fetchAndDisplayReservedPosts();
    }, 2000);

    setTimeout(() => {
      this.initMap(this.user_address, this.closestPosts, this.reservedPosts);
    }, 5000);
  }

  private fetchAndDisplayClosestPosts(user_coor): void {
    this.http.get<Post[]>(
      `https://waste-not-wizards.onrender.com/api/closePosts?latitude=${user_coor[1]}&longitude=${user_coor[0]}&reservation_status=Open`
    ).subscribe(
      (data) => {
        this.closestPosts = data.slice(0, 10);
      },
      (error) => {
        console.error('Error fetching closest posts:', error);
      }
    );
  }

  private fetchAndDisplayReservedPosts(): void {
    let token = this.getTokenFromLocalStorage();
    let url = 'https://waste-not-wizards.onrender.com/api/reservations/receiver/' + this.thisUserid + '/';

    this.http.get<any>(url, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      }
    }).subscribe(
      (data) => {
        this.reservedPosts = data;
      },
      (error) => {
        console.error('Error fetching reserved posts:', error);
      }
    );
  }

  private initMap(user_coordinates, open_coordinates, reserved_coordinates) {
    (mapboxgl as any).accessToken = 'pk.eyJ1IjoibWVhZ2FucnViaW5vIiwiYSI6ImNsa2QweHh0czBzbzMzanBoamxlNWYwN3EifQ.Z1_FaWyOr3_mK9ErWinJFw';
    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: new mapboxgl.LngLat(user_coordinates[0], user_coordinates[1]), // Set the initial center of the map
      zoom: 10 // Set the initial zoom level of the map
    });

    if (open_coordinates) {
      open_coordinates.forEach((pin_arr) => {
        var long = pin_arr.longitude;
        var lat = pin_arr.latitude;
        let id = '' + pin_arr.id;
        let pin = new mapboxgl.Marker().setLngLat([long, lat]).addTo(this.map);
        let doc = document.getElementById(id);
        pin.getElement().addEventListener('click', () => {
          doc.classList.add('red');
          doc.scrollIntoView({ behavior: 'smooth' });
        });
      });
    }

    if (reserved_coordinates) {
      reserved_coordinates.forEach((pin_arr) => {
        var long = pin_arr.longitude;
        var lat = pin_arr.latitude;
        let id = '' + pin_arr.id;
        let pin = new mapboxgl.Marker().setLngLat([long, lat]).addTo(this.map);
        let doc = document.getElementById(id);
        pin.getElement().addEventListener('click', () => {
          doc.classList.add('red');
          doc.scrollIntoView({ behavior: 'smooth' });
        });
      });
    }
  }

  public moveMap(event, post) {
    this.map.setCenter([post.longitude, post.latitude]);
  }

  public reserve(event, id, post) {
    let token = this.getTokenFromLocalStorage();
    let url = 'https://waste-not-wizards.onrender.com/api/posts/' + id + '/';
    let currentDateTime = this.datepipe.transform(new Date(), 'MM/dd/yyyy h:mm:ss');
    let data = { "reservation_status": "Reserved", "reserved_by": this.thisUser };
    let postdata = { "receiver": this.thisUser, "post": id, 'lat': post.latitude, 'long': post.longitude };
    let posturl = 'https://waste-not-wizards.onrender.com/api/reservations/receiver/' + this.thisUserid + '/';

    this.http.patch(url, data, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      }
    }).subscribe(
      res => {
        console.log("working patch!!!!");
      },
      error => {
        console.log("OOOHHH NOOO patch");
      }
    );

    this.http.post(posturl, postdata, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      }
    }).subscribe(
        res => {
          console.log("posturl working!!!!");
        },
        error => {
          console.log("OOOHHH NOOO posturl");
        }
      );
    }
  }