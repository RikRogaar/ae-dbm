import { Routes } from '@angular/router';
import { HomeComponent } from '@pages/home/home.component';
import { AddConnectionComponent } from './components/add-connection/add-connection.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'add-connection',
        component: AddConnectionComponent
    }
];
