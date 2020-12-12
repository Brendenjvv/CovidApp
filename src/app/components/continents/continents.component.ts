import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil, takeWhile } from 'rxjs/operators';
import { ViewComponentBase } from '../../classes/view-component-base';
import { ContinentsService } from '../../services/continents.service';

@Component({
  selector: 'app-continents',
  templateUrl: './continents.component.html',
  styleUrls: ['./continents.component.scss']
})
export class ContinentsComponent extends ViewComponentBase implements OnInit, OnDestroy {

  destroy$: Subject<boolean> = new Subject<boolean>();
  continentData$;

  displayedColumns = ['Continent', 'New', 'NewPerc', 'Active', 'ActivePerc', 'Deaths', 'DeathPerc'];

  constructor(public continentsService: ContinentsService) { 
    super();
  }

  ngOnInit(): void {
    this.subToContinentData();
    this.requestDataRefresh();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  private subToContinentData(){
    this.continentData$ =  this.continentsService.getContinentData().pipe(takeUntil(this.destroy$));
  }


}
