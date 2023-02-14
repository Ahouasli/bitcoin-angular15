import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BitcoinPricesComponent } from './bitcoin-prices.component';

describe('BitcoinPricesComponent', () => {
  let component: BitcoinPricesComponent;
  let fixture: ComponentFixture<BitcoinPricesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BitcoinPricesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BitcoinPricesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
