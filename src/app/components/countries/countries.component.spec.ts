import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CovidViewService } from 'src/app/services/covid-view.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { CountriesComponent } from './countries.component';
import { CountriesModule } from './countries.module';

describe('CountriesComponent', () => {
  let component: CountriesComponent;
  let fixture: ComponentFixture<CountriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CountriesModule,
        HttpClientTestingModule
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CountriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
