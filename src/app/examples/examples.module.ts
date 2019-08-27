import { NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { SharedModule } from '@app/shared';
import { environment } from '@env/environment';

import { FEATURE_NAME, reducers } from './examples.state';
import { ExamplesRoutingModule } from './examples-routing.module';
import { ExamplesComponent } from './examples/examples.component';

import { AuthenticatedComponent } from './authenticated/authenticated.component';
import { CrudComponent } from './crud/components/crud.component';

import { ExamplesEffects } from './examples.effects';
import { JeuxEffects } from './authenticated/jeu.effects';
import { JeuServiceService } from './authenticated/jeu-service.service';
import { LogosEffects } from './crud/logos.effects';
import { GearsComponent } from './gears/gears.component';

import { SHARED_VISUALS } from './visuals/shared';
import { D3_DIRECTIVES, D3Service } from './d3';
import { GraphComponent } from './visuals/graph/graph.component';
import { DataService } from './gears/data.service';
import { VotesEffects } from './crud/vote.effects';
@NgModule({
  imports: [
    SharedModule,
    ExamplesRoutingModule,
    StoreModule.forFeature(FEATURE_NAME, reducers),
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
      isolate: true
    }),
    EffectsModule.forFeature([
      ExamplesEffects,
      JeuxEffects,
      LogosEffects,
      VotesEffects
    ])
  ],
  declarations: [
    GraphComponent,
    ...SHARED_VISUALS,
    ...D3_DIRECTIVES,
    ExamplesComponent,
    CrudComponent,
    AuthenticatedComponent,
    GearsComponent
  ],
  providers: [JeuServiceService]
})
export class ExamplesModule {
  constructor() {}
}

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(
    http,
    `${environment.i18nPrefix}/assets/i18n/examples/`,
    '.json'
  );
}
