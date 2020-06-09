import { Component, OnInit, OnDestroy } from '@angular/core';
import { ServiceService } from 'src/services/service.service';
import { Subscription } from 'rxjs';
import { Service } from 'src/models/service.model';
import { HttpErrorResponse } from '@angular/common/http';
import { CommunicationService } from 'src/services/communication.service';

@Component({
  selector: 'app-favorite-services',
  templateUrl: './favorite-services.component.html',
  styleUrls: ['./favorite-services.component.scss']
})
export class FavoriteServicesComponent implements OnInit, OnDestroy {

  public isLoading: boolean;
  private serviceSub: Subscription;
  public services: Array<Service>;

  constructor(
    private communicationService: CommunicationService,
    private serviceService: ServiceService
  ) {
    this.isLoading = true;
  }

  ngOnInit(): void {
    this.serviceSub = this.serviceService.serviceSubject
      .subscribe(
        (services: Array<Service>) => {
          this.isLoading = false;
          this.services = services;
        }
      );
    this.refresh();
  }

  public refresh(name?: string): void {
    this.serviceService.fetchServices(name, true)
      .catch((error: HttpErrorResponse) => {
        this.isLoading = false;
        this.communicationService.showError(error.error.message);
      });
  }

  ngOnDestroy(): void {
    this.serviceSub.unsubscribe();
  }
}
