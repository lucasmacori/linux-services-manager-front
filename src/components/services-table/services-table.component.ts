import { Component, OnInit, Input } from '@angular/core';
import { Service } from 'src/models/service.model';
import { ServiceService } from 'src/services/service.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CommunicationService } from 'src/services/communication.service';

@Component({
  selector: 'app-services-table',
  templateUrl: './services-table.component.html',
  styleUrls: ['./services-table.component.scss']
})
export class ServicesTableComponent implements OnInit {

  @Input() services: Array<Service>;
  @Input() showDescription: boolean = false;
  @Input() showFavoriteButton: boolean = false;
  displayedColumns: string[] = [ 'name' ];

  constructor(
    private communicationService: CommunicationService,
    private serviceService: ServiceService
  ) {}

  ngOnInit(): void {
    if (this.showDescription) {
      this.displayedColumns.push('description');
    }
    if (this.showFavoriteButton) {
      this.displayedColumns.push('favorite');
    }
    this.displayedColumns.push('action');
  }

  public onToggleStar(service: Service): void {
    if (service.favorite) {
      this.serviceService.addFavoriteService(service)
        .then(() => {
          this.communicationService.showSuccess('Le service a bien été ajouté aux favoris');
        })
        .catch((error: HttpErrorResponse) => {
          this.communicationService.showError(error.error.message);
        });
    } else {
      this.serviceService.deleteFavoriteService(service)
        .then(() => {
          this.communicationService.showSuccess('Le service a bien été retiré des favoris');
        })
        .catch((error: HttpErrorResponse) => {
          this.communicationService.showError(error.error.message);
        });
    }
  }

  public onToggle(service: Service): void {
    if (service.active) {
      this.serviceService.stopService(service.name)
        .then(() => {
          this.communicationService.showSuccess('Le service a bien été éteint');
        })
        .catch((error: HttpErrorResponse) => {
          this.communicationService.showError(error.error.message);
        });
    } else {
      this.serviceService.startService(service.name)
        .then(() => {
          this.communicationService.showSuccess('Le service a bien été demarré');
        })
        .catch((error: HttpErrorResponse) => {
          this.communicationService.showError(error.error.message);
        });
    }
  }
}
