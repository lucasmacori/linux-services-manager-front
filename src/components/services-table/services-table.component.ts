import { Component, OnInit, Input } from '@angular/core';
import { Service } from 'src/models/service.model';
import { ServiceService } from 'src/services/service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-services-table',
  templateUrl: './services-table.component.html',
  styleUrls: ['./services-table.component.scss']
})
export class ServicesTableComponent implements OnInit {

  @Input() services: Array<Service> = [
    { name: 'apache2', description: 'Test', active: true }
  ];
  @Input() showDescription: boolean = false;
  displayedColumns: string[] = [ 'name' ];

  constructor(
    private snackBar: MatSnackBar,
    private serviceService: ServiceService
  ) {}

  ngOnInit(): void {
    if (this.showDescription) {
      this.displayedColumns.push('description');
    }
    this.displayedColumns.push('action');
  }

  public onToggle(service: Service): void {
    if (service.active) {
      this.serviceService.stopService(service.name)
        .then(() => {
          this.snackBar.open('La service a bien été arrêté', 'Fermer', {
            duration: 3000,
          });
        })
        .catch((error: HttpErrorResponse) => {
          
        });
    } else {
      this.serviceService.startService(service.name)
        .then(() => {
          this.snackBar.open('La service a bien été demarré', 'Fermer', {
            duration: 3000,
          });
        })
        .catch((error: HttpErrorResponse) => {
          
        });
    }
  }
}
