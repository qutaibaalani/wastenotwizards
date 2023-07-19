import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipientRegistrationComponent } from './recipient-registration.component';

describe('RecipientRegistrationComponent', () => {
    let component: RecipientRegistrationComponent;
    let fixture: ComponentFixture<RecipientRegistrationComponent>;

    beforeEach(() => {
    TestBed.configureTestingModule({
    declarations: [RecipientRegistrationComponent]
    });
    fixture = TestBed.createComponent(RecipientRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    });

    it('should create', () => {
    expect(component).toBeTruthy();
    });
});
