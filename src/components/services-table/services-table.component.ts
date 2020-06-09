import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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
  @Input() showSearch: boolean;
  @Output() filter: EventEmitter<string>;

  public noData: boolean = true;
  displayedColumns: string[] = [ 'name' ];

  constructor(
    private communicationService: CommunicationService,
    private serviceService: ServiceService
  ) {
    this.filter = new EventEmitter<string>();
    this.noData = true;
  }

  ngOnInit(): void {
    if (this.showDescription) {
      this.displayedColumns.push('description');
    }
    if (this.showFavoriteButton) {
      this.displayedColumns.push('favorite');
    }
    this.displayedColumns.push('action');
  }

  public applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.filter.emit(filterValue);
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
