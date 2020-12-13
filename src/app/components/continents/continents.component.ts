import { Component, OnDestroy, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { ViewComponentBase } from '../../classes/view-component-base';
import { CovidViewService } from '../../services/covid-view.service';

@Component({
  selector: 'app-continents',
  templateUrl: './continents.component.html',
  styleUrls: ['./continents.component.scss']
})
export class ContinentsComponent extends ViewComponentBase implements OnInit, OnDestroy {
  continentData$;
  displayedColumns = ['Continent', 'New', 'NewPerc', 'Active', 'ActivePerc', 'Deaths', 'DeathPerc'];

  constructor(public viewService: CovidViewService) { 
    super();
  }

  ngOnInit(): void {
    this.subToContinentData();
    this.requestDataRefresh();
  }

  ngOnDestroy(): void {
    this.destroy();
  }

  private subToContinentData(){
    this.continentData$ =  this.viewService.getContinentData().pipe(takeUntil(this.destroy$));
  }


}
