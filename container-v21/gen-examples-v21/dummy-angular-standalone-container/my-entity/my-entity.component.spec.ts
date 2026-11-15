
import { TestBed } from '@angular/core/testing';
import { MyEntityContainer } from './my-entity.container';

describe('MyEntityContainer', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyEntityContainer],
    }).compileComponents();
  });

  it('should create the component', () => {
    const fixture = TestBed.createComponent(MyEntityContainer);

    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should have translation initialized', () => {
    const fixture = TestBed.createComponent(MyEntityContainer);

    expect(fixture.componentInstance.t).toBeDefined();
  });
});
