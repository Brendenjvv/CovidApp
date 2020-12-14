import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ContinentsComponent } from '../continents/continents.component';
import { CountriesComponent } from '../countries/countries.component';

import { NavWrapperComponent } from './nav-wrapper.component';
import { NavWrapperModule } from './nav-wrapper.module';
import { routes } from './nav-wrapper.routing.module';

describe('NavWrapperComponent', () => {
  let component: NavWrapperComponent;
  let fixture: ComponentFixture<NavWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(routes),
        NavWrapperModule,
        HttpClientTestingModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render continents component for /continents', fakeAsync(() => {
    const router = TestBed.inject(Router);
    const onActivateSpy = spyOn(component, 'onActivate');
    router.navigate(['continents']).then(() => {
      expect(onActivateSpy).toHaveBeenCalledWith(jasmine.any(ContinentsComponent));
    });
  }));

  it('should render continents component for /countries', fakeAsync(() => {
    const router = TestBed.inject(Router);
    const onActivateSpy = spyOn(component, 'onActivate');
    router.navigate(['countries']).then(() => {
      expect(onActivateSpy).toHaveBeenCalledWith(jasmine.any(CountriesComponent));
    });
  }));

  it('should navigate to /continents component on empty path', fakeAsync(() => {
    const router = TestBed.inject(Router);
    router.navigate(['']).then(() => {
      expect(router.url).toEqual('/continents');
    });
  }));
});
