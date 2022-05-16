import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { Actor } from 'src/app/models/actor.model';
import { AuthService } from 'src/app/services/auth.service';
import { MessageService } from 'src/app/services/message.service';
import { ActorService } from 'src/app/services/actor.service';
import { TranslatableComponent } from '../../shared/translatable/translatable.component';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent extends TranslatableComponent implements OnInit {

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  private actors: Actor[];
  private actorId: String;
  private role: string;

  constructor(private translateService: TranslateService, private actorService: ActorService,
    private messageService: MessageService, private authService: AuthService) {
    super(translateService);
  }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true
    };

    this.actorId = this.authService.getUserId();
    this.role = this.authService.getRole();

    this.actorService.getActors()
    .then((actorList: Actor[]) => {
      if (this.role === 'ADMINISTRATOR') {
        this.actors = actorList;
      } else {
        this.actors = [];
      }
      this.dtTrigger.next();
    });
  }

}
