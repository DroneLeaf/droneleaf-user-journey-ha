import { Component, OnInit } from '@angular/core';
import { ToastService } from 'src/app/core/services/toast.service';

@Component({
  selector: 'app-business-dashboard',
  templateUrl: './business-dashboard.component.html',
  styleUrls: ['./business-dashboard.component.scss'],
})
export class BusinessDashboardComponent  implements OnInit {
  fullName: string = '';
openDropdown: string | null = null;
  constructor(private toastService: ToastService) { }
showAddDroneModal = false;
  ngOnInit() {
    // Check for success toast flag
    const shouldShowToast = sessionStorage.getItem('showSuccessToast');

    if (shouldShowToast === 'true') {
      this.toastService.show({
        title: 'Successfully Registered!',
        message: 'Your account has been successfully registered',
        type: 'success',
        position: 'top-center',
      });
      sessionStorage.removeItem('showSuccessToast');
    }

    // Load user info from localStorage
    const savedInfo = localStorage.getItem('business.info');
    if (savedInfo) {
      const info = JSON.parse(savedInfo);
      const first = info.firstName || '';
      const last = info.lastName || '';
      this.fullName = `${first} ${last}`.trim();
    }
}

   toggleDropdown(droneName: string) {
    this.openDropdown = this.openDropdown === droneName ? null : droneName;
  }

  stats = [
  {
    title: 'Drones',
    value: '23',
    percent: '↑ 5.35%',
    since: 'Since last month',
    color: 'text-green-600',
  },
  {
    title: 'Number of Flights',
    value: '47',
    percent: '↓ 1.23%',
    since: 'Since last month',
    color: 'text-red-500',
  },
  {
    title: 'Number of Users',
    value: '281',
    percent: '↑ 5.35%',
    since: 'Since last month',
    color: 'text-green-600',
  },
  {
    title: 'Drone Licenses',
    value: '15',
    percent: '↑ 5.35%',
    since: 'Since last month',
    color: 'text-green-600',
  }
];

tableData = [
  {
    name: 'X500_Target',
    created: '19/06/2025',
    lastUsed: '19/06/2025 - John',
    app: 'Application',
    status: 'Ready for Learning',
    statusColor: 'text-blue-600 bg-blue-100',
  },
  {
    name: 'Medo-local',
    created: '19/06/2025',
    lastUsed: '19/06/2025 - Antonio',
    app: 'Application',
    status: 'Ready to Fly',
    statusColor: 'text-green-700 bg-green-100',
  },
  {
    name: 'ADASI',
    created: '15/06/2025',
    lastUsed: '19/06/2025 - Khalil',
    app: 'Application',
    status: 'Ready but Unlicensed',
    statusColor: 'text-yellow-700 bg-yellow-100',
  },
  {
    name: 'ENEC P3',
    created: '15/06/2025',
    lastUsed: '19/06/2025 - Mohamed',
    app: 'Application',
    status: 'Template Only',
    statusColor: 'text-gray-700 bg-gray-100',
  },
  {
    name: 'Workshop_01',
    created: '12/06/2025',
    lastUsed: '13/06/2025 - John',
    app: 'Application',
    status: 'In Progress',
    statusColor: 'text-orange-700 bg-orange-100',
  },
];

cards = [
    {
      name: 'X500_Target',
      time: 'Just now',
      progress: 85,
      progressColor: 'bg-green-500',
      dotColor: 'bg-green-500',
    },
    {
      name: 'Medo-local',
      time: '5 min ago',
      progress: 92,
      progressColor: 'bg-green-500',
      dotColor: 'bg-green-500',
    },
    {
      name: 'ADASI',
      time: '2 hours ago',
      progress: 67,
      progressColor: 'bg-green-500',
      dotColor: 'bg-blue-400',
    },
    {
      name: 'Workshop_01',
      time: '1 day ago',
      progress: 23,
      progressColor: 'bg-yellow-400',
      dotColor: 'bg-red-500',
    },
  ];

    tasks = [
    {
      title: 'Flight Path Of Drone XYZ',
      time: '2 hours ago',
      status: 'Completed'
    },
    {
      title: 'Batter Diagnosis Test',
      time: '4 hours ago',
      status: 'In-Progress'
    },
    {
      title: 'Censor Calibration',
      time: '1 day ago',
      status: 'Pending'
    },
    {
      title: 'Weather Assessment',
      time: '1 day ago',
      status: 'Completed'
    }
  ];

    getBadgeClasses(status: string): string {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-600';
      case 'In-Progress':
        return 'bg-gray-200 text-gray-700';
      case 'Pending':
        return 'bg-gray-100 text-gray-600';
      default:
        return 'bg-gray-300 text-gray-800';
    }
  }

}
