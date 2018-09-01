import { Component, OnInit, Input } from '@angular/core';
import PerfectScrollbar from 'perfect-scrollbar';

declare const $: any;

// Metadata
export interface RouteInfo {
    path: string;
    title: string;
    type: string;
    icontype: string;
    collapse?: string;
    children?: ChildrenItems[];
    usedBy: string
}

export interface ChildrenItems {
    path: string;
    title: string;
    ab: string;
    type?: string;
}

// Menu Items
export const ROUTES: RouteInfo[] = [
    // public
    {
        path: '/public/dashboard',
        title: 'Dashboard',
        type: 'link',
        icontype: 'dashboard',
        usedBy: 'public'
    },
    // host
    {
        path: '/host/dashboard',
        title: 'Dashboard',
        type: 'link',
        icontype: 'dashboard',
        usedBy: 'host'
    },
    {
        path: '/host/reports',
        title: 'Reports List',
        type: 'sub',
        icontype: 'information',
        collapse: 'host/reports',
        children: [
            {path: 'table', title: 'Table View', ab: 'TV'},
            {path: 'map', title: 'Map View', ab: 'MV'}
        ],
        usedBy: 'host'
    }
];

@Component({
    selector: 'app-sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {
    public menuItems: any[];
    @Input() routeGroup: string;
    isMobileMenu() {
        if ($(window).width() > 991) {
            return false;
        }
        return true;
    };

    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem.usedBy === this.routeGroup);
    }
    updatePS(): void  {
        if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
            const elemSidebar = <HTMLElement>document.querySelector('.sidebar .sidebar-wrapper');
            const ps = new PerfectScrollbar(elemSidebar, { wheelSpeed: 2, suppressScrollX: true });
        }
    }
    isMac(): boolean {
        let bool = false;
        if (navigator.platform.toUpperCase().indexOf('MAC') >= 0 || navigator.platform.toUpperCase().indexOf('IPAD') >= 0) {
            bool = true;
        }
        return bool;
    }
}
