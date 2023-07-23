import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderPostComponent } from './provider-post.component';

describe('ProviderPostComponent', () => {
  let component: ProviderPostComponent;
  let fixture: ComponentFixture<ProviderPostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProviderPostComponent]
    });
    fixture = TestBed.createComponent(ProviderPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
