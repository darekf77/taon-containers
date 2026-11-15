
import { TestBed } from '@angular/core/testing';
import { MyEntityComponent } from './my-entity.component';

describe('MyEntityComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyEntityComponent],
    }).compileComponents();
  });

  it('should create the component', () => {
    const fixture = TestBed.createComponent(MyEntityComponent);

    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should have translation initialized', () => {
    const fixture = TestBed.createComponent(MyEntityComponent);

    expect(fixture.componentInstance.t).toBeDefined();
  });
});
