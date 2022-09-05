import { Component, OnInit } from '@angular/core';
import { Chart, ChartConfiguration, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { latLng, MapOptions, tileLayer, Map, Marker, icon, LatLng } from 'leaflet';

@Component({
  selector: 'app-rastreo-tr',
  templateUrl: './rastreo-tr.component.html',
  styleUrls: ['./rastreo-tr.component.css']
})
export class RastreoTrComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  fecha = new Date();

  eqStats: any = {
    velocidad: 50,
    coordenadas: '25.6166833,-103.4396177',
    direccion: 'Del Mayoral 85, Residencial la Hacienda, 27276 Torreón, Coah.',
    temperatura: '35',
    voltext: '12',
    voltint: '5',
    senalgps: 'Buena',
    senalgsm: 'Aceptable',
    fechahora: `${this.fecha.getDate().toString()}/${((this.fecha.getMonth() + 1) <= 9 ? ('0' + (this.fecha.getMonth() + 1).toString()) : (this.fecha.getMonth() + 1).toString())}/${this.fecha.getFullYear().toString()} ${this.fecha.getHours().toString()}:${this.fecha.getMinutes().toString()}:${this.fecha.getSeconds().toString()}`
  }

  eqDataHistorical = [
    {
      velocidad: 65,
      temperatura: 65,
      coordenadas: '25.519675, -103.395454',
      direccion: 'Del Mayoral 85, Residencial la Hacienda, 27276 Torreón, Coah.',
      voltext: 65,
      voltint: 65,
      senalgps: 65,
      senalgsm: 65
    },
    {
      velocidad: 59,
      temperatura: 59,
      coordenadas: '25.519675, -103.395454',
      direccion: 'Del Mayoral 85, Residencial la Hacienda, 27276 Torreón, Coah.',
      voltext: 59,
      voltint: 59,
      senalgps: 59,
      senalgsm: 59
    },
    {
      velocidad: 80,
      temperatura: 80,
      coordenadas: '25.519675, -103.395454',
      direccion: 'Del Mayoral 85, Residencial la Hacienda, 27276 Torreón, Coah.',
      voltext: 80,
      voltint: 80,
      senalgps: 80,
      senalgsm: 80
    },
    {
      velocidad: 81,
      temperatura: 81,
      coordenadas: '25.519675, -103.395454',
      direccion: 'Del Mayoral 85, Residencial la Hacienda, 27276 Torreón, Coah.',
      voltext: 81,
      voltint: 81,
      senalgps: 81,
      senalgsm: 81
    },
    {
      velocidad: 56,
      temperatura: 56,
      coordenadas: '25.519675, -103.395454',
      direccion: 'Del Mayoral 85, Residencial la Hacienda, 27276 Torreón, Coah.',
      voltext: 56,
      voltint: 56,
      senalgps: 56,
      senalgsm: 56
    },
    {
      velocidad: 55,
      temperatura: 55,
      coordenadas: '25.519675, -103.395454',
      direccion: 'Del Mayoral 85, Residencial la Hacienda, 27276 Torreón, Coah.',
      voltext: 55,
      voltint: 55,
      senalgps: 55,
      senalgsm: 55
    },
    {
      velocidad: 40,
      temperatura: 40,
      coordenadas: '25.519675, -103.395454',
      direccion: 'Del Mayoral 85, Residencial la Hacienda, 27276 Torreón, Coah.',
      voltext: 40,
      voltint: 40,
      senalgps: 40,
      senalgsm: 40
    }
  ]

  eqInfo: any = {
    noSerie: 'ABC123456789102ndG',
    cuenta: 1,
    unidad: 359
  }

  cuentas = [
    {
      id: 1,
      nombre: 'SEUAC'
    },
    {
      id: 2,
      nombre: 'CATERPILLAR'
    }
  ]

  unidades = [
    {
      id: 1,
      nombre: 'camion 1'
    },
    {
      id: 2,
      nombre: 'camion2'
    },
    {
      id: 359,
      nombre: 'Camion3'
    }
  ]

  filters: any = {
    inicialDate: '',
    finalDate: ''
  }

  dateOptions = [
    {
      id: 1,
      label: '1 semana'
    },
    {
      id: 2,
      label: '2 semanas'
    },
    {
      id: 3,
      label: 'Elegir rango de fechas'
    },
    {
      id: 4,
      label: 'Actual'
    }
  ]

  dateOptionSelected = 0
  dateRange = true

  public lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [65, 59, 80, 81, 56, 55, 40],
        label: 'Velocidad',
        backgroundColor: 'rgba(100, 149, 237,0.2)',
        borderColor: 'rgba(100, 149, 237,1)',
        pointBackgroundColor: 'rgba(100, 149, 237,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(100, 149, 237,0.8)',
        fill: 'origin',
      }
    ],
    labels: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo']
  };
  public lineChartData2: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [65, 59, 80, 81, 56, 55, 40],
        label: 'Temperatura',
        backgroundColor: 'rgba(238, 55, 55,0.2)',
        borderColor: 'rgba(238, 55, 55,1)',
        pointBackgroundColor: 'rgba(238, 55, 55,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(238, 55, 55,0.8)',
        fill: 'origin',
      }
    ],
    labels: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo']
  };
  public lineChartData3: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [65, 59, 80, 81, 56, 55, 40],
        label: 'Voltaje externo',
        backgroundColor: 'rgba(55, 238, 55,0.2)',
        borderColor: 'rgba(55, 238, 55,1)',
        pointBackgroundColor: 'rgba(55, 238, 55,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(55, 238, 55,0.8)',
        fill: 'origin',
      }
    ],
    labels: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo']
  };
  public lineChartData4: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [65, 59, 80, 81, 56, 55, 40],
        label: 'Voltaje interno',
        backgroundColor: 'rgba(250, 253, 36,0.2)',
        borderColor: 'rgba(250, 253, 36,1)',
        pointBackgroundColor: 'rgba(250, 253, 36,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(250, 253, 36,0.8)',
        fill: 'origin',
      }
    ],
    labels: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo']
  };
  public lineChartData5: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [65, 59, 80, 81, 56, 55, 40],
        label: 'Señal GPS',
        backgroundColor: 'rgba(253, 36, 188,0.2)',
        borderColor: 'rgba(253, 36, 188,1)',
        pointBackgroundColor: 'rgba(253, 36, 188,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(253, 36, 188,0.8)',
        fill: 'origin',
      }
    ],
    labels: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo']
  };
  public lineChartData6: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [65, 59, 80, 81, 56, 55, 40],
        label: 'Señal GSM',
        backgroundColor: 'rgba(255, 153, 0,0.2)',
        borderColor: 'rgba(255, 153, 0,1)',
        pointBackgroundColor: 'rgba(255, 153, 0,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(255, 153, 0,0.8)',
        fill: 'origin',
      }
    ],
    labels: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo']
  };

  public lineChartOptions: ChartConfiguration['options'] = {
    elements: {
      line: {
        tension: 0.5
      }
    },
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      x: {},
      'y-axis-0':
      {
        position: 'left',
      },
      'y-axis-1': {
        position: 'right',
        grid: {
          color: 'rgba(255,0,0,0.3)',
        },
        ticks: {
          color: 'red'
        }
      }
    }
  };

  public lineChartType: ChartType = 'line';

  map!: Map;
  mapOptions!: MapOptions;

  constructor() { }

  ngOnInit(): void {
    this.initializeMapOptions();
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      lengthMenu: [5, 10, 25],
      processing: true,
      language: {
        url: 'https://cdn.datatables.net/plug-ins/1.11.5/i18n/es-ES.json'
      },
      /* responsive: true */
    }
  }

  onMapReady(map: Map) {
    this.map = map;
    this.addSampleMarker({ lat: 25.519675, lng: -103.395454 });
  }

  initializeMapOptions() {
    this.mapOptions = {
      center: [25.519675, -103.395454],
      zoom: 12,
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
    const marker = new Marker([position.lat, position.lng])
      .setIcon(
        icon({
          iconSize: [25, 41],
          iconAnchor: [13, 41],
          iconUrl: 'assets/marker-icon.png'
        }));
    marker.addTo(this.map);
  }

  dateOptionsChanged() {
    if (this.dateOptionSelected != 3) {
      this.dateRange = false
    }
    else {
      this.dateRange = true
    }
  }
}
