import { OnInit } from '@angular/core';
import { Component } from '@angular/core';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {
    model: any[] = [];
    constructor() { }
    ngOnInit() {
        this.model = [
            {
                label: 'Panel',
                icon: '',
                items: [
                    {
                        label: 'Dashboards',
                        icon: 'fa fa-tachometer',
                        items: [
                            { label: 'Dashboard', icon: 'fa fa-tachometer', routerLink: ['/panel/'] },
                            { label: 'Ordenes', icon: 'fa fa-file', routerLink: ['/panel/'] },
                            { label: 'Comprobantes', icon: 'fa fa-folder', routerLink: ['/panel/'] }
                        ]
                    },
                ]
            },
            {
                label: 'Almacén',
                icon: 'fa fa-book',
                items: [
                    {
                        label: 'Categorias',
                        icon: 'fa fa-circle',
                        routerLink: ['/panel/categories']
                    },

                    {
                        label: 'Productos',
                        icon: 'fa fa-circle',
                        routerLink: ['/panel/products']
                    }
                ]
            },
            {
                label: 'Personal',
                icon: 'fa fa-users',
                items: [
                    {
                        label: 'Empleados',
                        icon: 'fa fa-user',
                        routerLink: ['/panel/employee']
                    },

                    {
                        label: 'Clientes',
                        icon: 'fa fa-user',
                        routerLink: ['/panel/customer']
                    }
                ]
            },

        ];
    }
}
