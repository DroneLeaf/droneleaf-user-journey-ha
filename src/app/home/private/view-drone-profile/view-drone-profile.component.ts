import { Component, OnInit } from '@angular/core';

interface FlightLog {
  id: string;
  start: string;
  duration: string;
  type: string;
  result: string;
}

interface RemoteControl {
  model: string;
  protocol: string;
  lastSync: string;
}

interface IndoorEnvironment {
  system: string;
  rigidBodyId: string;
  calibration: string;
  calibrationDate: string;
  isSelected: boolean;
}

interface GeneralInfo {
  created: string;
  creator: string;
  instanceId: string;
  firmware: string;
  sdk: string;
}

@Component({
  selector: 'app-view-drone-profile',
  templateUrl: './view-drone-profile.component.html',
  styleUrls: ['./view-drone-profile.component.scss'],
})
export class ViewDroneProfileComponent implements OnInit {
  activeTab: string = 'overview';

  flightLogs: FlightLog[] = [
    {
      id: 'FL-1092',
      start: '19/06/2025 - 10:11',
      duration: '04:32',
      type: 'Indoor',
      result: 'Ok'
    },
    {
      id: 'FL-1038',
      start: '19/06/2025 - 08:22',
      duration: '02:15',
      type: 'Indoor',
      result: 'Ok'
    },
    {
      id: 'FL-1022',
      start: '15/06/2025 - 12:34',
      duration: '00:47',
      type: 'Indoor',
      result: 'Abort'
    },
    {
      id: 'FL-1012',
      start: '15/06/2025 - 14:34',
      duration: '08:12',
      type: 'Indoor',
      result: 'Ok'
    }
  ];

  remoteControl: RemoteControl = {
    model: 'FrSky X9 Lite',
    protocol: 'SBUS',
    lastSync: '12/08/2025 - 18:40'
  };

  rcNotes: string = 'Kill-switch mapped to CH7. Multi-function switches: A - CH11, B - CH12';

  indoorEnvironment: IndoorEnvironment = {
    system: 'OptiTrack',
    rigidBodyId: '42',
    calibration: 'Ok',
    calibrationDate: '12/08/2025',
    isSelected: true
  };

  hasOutdoorSetup: boolean = false;

  generalInfo: GeneralInfo = {
    created: '12/08/2025 - 15:12',
    creator: 'antonio@droneleaf.ai',
    instanceId: 'DL-IN-01',
    firmware: 'LeafFC 2.9.1',
    sdk: 'Leaf SDK 1.6.0'
  };

  constructor() { }

  ngOnInit() {}

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }

  rebindRC(): void {
    console.log('Rebinding RC');
    // Implementation would go here
  }

  testChannels(): void {
    console.log('Testing channels');
    // Implementation would go here
  }

  viewSetup(): void {
    console.log('View indoor setup');
    // Implementation would go here
  }

  recalibrate(): void {
    console.log('Recalibrate indoor environment');
    // Implementation would go here
  }

  startOutdoorSetup(): void {
    console.log('Start outdoor setup');
    // Implementation would go here
  }
}
