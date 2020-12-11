import { Component, OnInit } from '@angular/core';
import { CovidStoreService } from 'src/app/services/covid-store.service';

@Component({
  selector: 'app-continents',
  templateUrl: './continents.component.html',
  styleUrls: ['./continents.component.scss']
})
export class ContinentsComponent implements OnInit {

  constructor(public covidStoreService: CovidStoreService) { }

  ngOnInit(): void {
    this.covidStoreService.updateStore();
  }

}
