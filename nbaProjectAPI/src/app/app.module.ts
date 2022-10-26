import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ImportsMaterialModule } from 'src/imports-material/imports-material.module';
import { PlayerListComponent } from './components/player-list/player-list.component';
import { LandingComponent } from './components/landing/landing.component';
import { HeaderComponent } from './components/header/header.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { TeamsComponent } from './components/teams/teams.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TeamsDetailComponent } from './components/teams/teams-detail/teams-detail.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { PlayerDetailsComponent } from './components/player-details/player-details.component';
import { PlayerCardComponent } from './components/player-card/player-card.component';

@NgModule({
  declarations: [
    AppComponent,
    PlayerListComponent,
    LandingComponent,
    HeaderComponent,
    CarouselComponent,
    PlayerDetailsComponent,
    TeamsComponent,
    CarouselComponent,
    TeamsDetailComponent,
    PageNotFoundComponent,
    PlayerCardComponent



  ],
  imports: [
    AppRoutingModule,
    ImportsMaterialModule,
    FlexLayoutModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
