import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Service } from 'src/models/service.model';
import { ServiceService } from 'src/services/service.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit, OnDestroy {

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
