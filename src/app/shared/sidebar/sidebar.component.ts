import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { LayoutService } from 'src/app/core/services/layout.service';

interface SidebarItem {
  label: string;
  link: string;
  iconPath: string;
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  isSidebarOpen: boolean = false;
  isMobile: boolean = false;
  sidebarItems: SidebarItem[] = [];
  userRole: 'private' | 'business' | null = null;

  constructor(
    public layoutService: LayoutService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userRole = localStorage.getItem('userRole') as 'private' | 'business';
    this.setSidebarItems();

    this.layoutService.isMobile$.subscribe((val) => (this.isMobile = val));
    this.layoutService.isSidebarOpen$.subscribe((val) => (this.isSidebarOpen = val));

    // Optional: auto-close sidebar on route change (mobile only)
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd && this.isMobile) {
        this.layoutService.closeSidebar();
      }
    });
  }

  setSidebarItems() {
    const common: SidebarItem[] = [
      {
        label: 'Notifications',
        link: '/notifications',
        iconPath: '../../../assets/svgs/private/notification.png',
      },
    ];

    const privateItems: SidebarItem[] = [
      {
        label: 'Home',
        link: '/dashboard',
        iconPath: '../../../assets/svgs/private/home-2.svg',
      },
      {
        label: 'Drone Library',
        link: '/drone-library',
        iconPath: '../../../assets/svgs/private/folder-open.svg',
      },
      {
        label: 'Mission Management',
        link: '/missions',
        iconPath: '../../../assets/svgs/private/directbox-notif.svg',
      },
      {
        label: 'AI Dojo',
        link: '/reports',
        iconPath: '../../../assets/svgs/private/main-component.png',
      },
    ];

    const businessItems: SidebarItem[] = [
      {
        label: 'Business Dashboard',
        link: '/business-dashboard',
        iconPath: '../../../assets/svgs/private/home-2.svg',
      },
      {
        label: 'Drone Library',
        link: '/teams',
        iconPath: '../../../assets/svgs/private/folder-open.svg',
      },
      {
        label: 'Mission Management',
        link: '/fleet',
        iconPath: '../../../assets/svgs/private/directbox-notif.svg',
      },
      {
        label: 'AI Dojo',
        link: '/settings',
        iconPath: '../../../assets/svgs/private/main-component.png',
      },
      {
        label: 'User Profile',
        link: '/settings',
        iconPath: '../../../assets/svgs/private/profile-2user.png',
      },
      {
        label: 'User Management',
        link: '/settings',
        iconPath: '../../../assets/svgs/business/people.svg',
      },
    ];

    this.sidebarItems =
      this.userRole === 'private'
        ? [...privateItems, ...common]
        : [...businessItems, ...common];
  }

  handleMenuClick() {
    if (this.isMobile) {
      this.layoutService.closeSidebar();
    }
  }

  logout() {
    localStorage.clear();
    window.location.href = '/auth/account-type';
  }
}
