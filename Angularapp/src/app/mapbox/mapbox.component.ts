import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-mapbox',
  templateUrl: './mapbox.component.html',
  styleUrls: ['./mapbox.component.css']
})
export class MapboxComponent implements OnInit {

  map!: mapboxgl.Map;

  constructor() { }

  ngOnInit() {
    (mapboxgl as any).default.accessToken = 'pk.eyJ1IjoibWVhZ2FucnViaW5vIiwiYSI6ImNsa2QweHh0czBzbzMzanBoamxlNWYwN3EifQ.Z1_FaWyOr3_mK9ErWinJFw';

    this.map = new mapboxgl.Map({
      container: 'map', // container ID
      style: 'mapbox://styles/mapbox/streets-v11', // ssheets loc
      center: [-73.990593, 40.740121], // starting position [lng, lat]
      zoom: 9 // starting zoom
    });
  }
}

