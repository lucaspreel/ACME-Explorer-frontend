import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Actor } from 'src/app/models/actor.model';
import { ActorService } from 'src/app/services/actor.service';
import { AuthService } from 'src/app/services/auth.service';
import { TranslatableComponent } from '../../shared/translatable/translatable.component';

@Component({
  selector: 'app-profile-display',
  templateUrl: './profile-display.component.html',
  styleUrls: ['./profile-display.component.css']
})
export class ProfileDisplayComponent extends TranslatableComponent implements OnInit {

  actor: Actor;

  constructor(private authService: AuthService,
    private router: Router,
    private actorService: ActorService,
    private translateService: TranslateService) {
      super(translateService);
    }

  ngOnInit() {
    const idActor = this.authService.getUserId();
    this.actorService.getActor(idActor).then((actor) => {
      this.actor = actor;
    });
  }
}
