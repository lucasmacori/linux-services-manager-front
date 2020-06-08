import { Component, OnInit, Input } from '@angular/core';
import { Service } from 'src/models/service.model';

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

  constructor() {}

  ngOnInit(): void {
    if (this.showDescription) {
      this.displayedColumns.push('description');
    }
    this.displayedColumns.push('action');
  }

  public onToggle(service: Service): void {
    // TODO: Démarrage ou extinction du service
    // L'état du service envoyé dans la méthode n'est pas encore modifié lors de l'appel à cette dernière
    // Il faut donc envoyé l'inverse de la valeur reçue en paramètre dans 'service.active'
  }
}
