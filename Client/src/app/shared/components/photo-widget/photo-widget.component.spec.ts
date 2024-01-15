import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoWidgetComponent } from './photo-widget.component';

describe('PhotoWidgetComponent', () => {
  let component: PhotoWidgetComponent;
  let fixture: ComponentFixture<PhotoWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhotoWidgetComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PhotoWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
