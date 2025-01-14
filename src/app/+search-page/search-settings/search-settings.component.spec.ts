import { SearchService } from '../search-service/search.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchSettingsComponent } from './search-settings.component';
import { of as observableOf } from 'rxjs';
import { PaginationComponentOptions } from '../../shared/pagination/pagination-component-options.model';
import { SortDirection, SortOptions } from '../../core/cache/models/sort-options.model';
import { TranslateModule } from '@ngx-translate/core';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { SidebarService } from '../../shared/sidebar/sidebar.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { EnumKeysPipe } from '../../shared/utils/enum-keys-pipe';
import { By } from '@angular/platform-browser';
import { SearchFilterService } from '../search-filters/search-filter/search-filter.service';
import { VarDirective } from '../../shared/utils/var.directive';
import { take } from 'rxjs/operators';
import { SEARCH_CONFIG_SERVICE } from '../../+my-dspace-page/my-dspace-page.component';

describe('SearchSettingsComponent', () => {

  let comp:SearchSettingsComponent;
  let fixture:ComponentFixture<SearchSettingsComponent>;
  let searchServiceObject:SearchService;

  let pagination:PaginationComponentOptions;
  let sort:SortOptions;
  let mockResults;
  let searchServiceStub;

  let queryParam;
  let scopeParam;
  let paginatedSearchOptions;

  let activatedRouteStub;

  let sidebarService;

  beforeEach(async(() => {
    pagination = new PaginationComponentOptions();
    pagination.id = 'search-results-pagination';
    pagination.currentPage = 1;
    pagination.pageSize = 10;
    sort = new SortOptions('score', SortDirection.DESC);
    mockResults = ['test', 'data'];
    searchServiceStub = {
      searchOptions: {pagination: pagination, sort: sort},
      search: () => mockResults,
    };

    queryParam = 'test query';
    scopeParam = '7669c72a-3f2a-451f-a3b9-9210e7a4c02f';
    paginatedSearchOptions = {
      query: queryParam,
      scope: scopeParam,
      pagination,
      sort,
    };

    activatedRouteStub = {
      queryParams: observableOf({
        query: queryParam,
        scope: scopeParam,
      }),
    };

    sidebarService = {
      isCollapsed: observableOf(true),
      collapse: () => this.isCollapsed = observableOf(true),
      expand: () => this.isCollapsed = observableOf(false),
    };

    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot(), RouterTestingModule.withRoutes([])],
      declarations: [SearchSettingsComponent, EnumKeysPipe, VarDirective],
      providers: [
        {provide: SearchService, useValue: searchServiceStub},

        {provide: ActivatedRoute, useValue: activatedRouteStub},
        {
          provide: SidebarService,
          useValue: sidebarService,
        },
        {
          provide: SearchFilterService,
          useValue: {},
        },
        {
          provide: SEARCH_CONFIG_SERVICE,
          useValue: {
            paginatedSearchOptions: observableOf(paginatedSearchOptions),
            getCurrentScope: observableOf('test-id'),
          },
        },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchSettingsComponent);
    comp = fixture.componentInstance;

    // SearchPageComponent test instance
    fixture.detectChanges();
    searchServiceObject = (comp as any).service;
    spyOn(comp, 'reloadRPP');
    spyOn(comp, 'reloadOrder');
    spyOn(searchServiceObject, 'search').and.callThrough();

  });

  it('it should show the order settings with the respective selectable options', (done) => {
    (comp as any).searchOptions$.pipe(take(1)).subscribe((options) => {
      fixture.detectChanges();
      const orderSetting = fixture.debugElement.query(By.css('div.result-order-settings'));
      expect(orderSetting).toBeDefined();
      const childElements = orderSetting.queryAll(By.css('option'));
      expect(childElements.length).toEqual(comp.searchOptionPossibilities.length);
      done();
    });
  });

  it('it should show the size settings with the respective selectable options', (done) => {
    (comp as any).searchOptions$.pipe(take(1)).subscribe((options) => {
        fixture.detectChanges();
        const pageSizeSetting = fixture.debugElement.query(By.css('div.page-size-settings'));
        expect(pageSizeSetting).toBeDefined();
        const childElements = pageSizeSetting.queryAll(By.css('option'));
        expect(childElements.length).toEqual(options.pagination.pageSizeOptions.length);
        done();
      },
    );
  });

  it('should have the proper order value selected by default', (done) => {
    (comp as any).searchOptions$.pipe(take(1)).subscribe((options) => {
      fixture.detectChanges();
      const orderSetting = fixture.debugElement.query(By.css('div.result-order-settings'));
      const childElementToBeSelected = orderSetting.query(By.css('option[value="0"][selected="selected"]'));
      expect(childElementToBeSelected).toBeDefined();
      done();
    });
  });

  it('should have the proper rpp value selected by default', (done) => {
    (comp as any).searchOptions$.pipe(take(1)).subscribe((options) => {
      fixture.detectChanges();
      const pageSizeSetting = fixture.debugElement.query(By.css('div.page-size-settings'));
      const childElementToBeSelected = pageSizeSetting.query(By.css('option[value="10"][selected="selected"]'));
      expect(childElementToBeSelected).toBeDefined();
      done();
    });
  });

});
