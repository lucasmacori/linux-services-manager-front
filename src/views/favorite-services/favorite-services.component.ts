import { Component, OnInit, OnDestroy } from '@angular/core';
import { ServiceService } from 'src/services/service.service';
import { Subscription } from 'rxjs';
import { Service } from 'src/models/service.model';

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
    private serviceService: ServiceService
  ) {
    this.isLoading = true;
  }

  ngOnInit(): void {
    this.serviceSub = this.serviceService.serviceSubject
      .subscribe(
        (services: Array<Service>) => {
          console.log(services);
          this.isLoading = false;
          this.services = services;
        }
      );
    this.serviceService.fetchServices();
  }

  ngOnDestroy(): void {
    this.serviceSub.unsubscribe();
  }
}
