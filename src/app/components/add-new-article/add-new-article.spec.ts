import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewArticle } from './add-new-article';

describe('AddNewArticle', () => {
  let component: AddNewArticle;
  let fixture: ComponentFixture<AddNewArticle>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddNewArticle]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddNewArticle);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
