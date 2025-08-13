import { Drone } from "../models/drone-library.model";

// for now will replace/remove this folder when use API
export const DRONES: Drone[] = [
  {
    name: 'X500_Target',
    dateCreated: new Date('2025-06-19'),
    lastUsed: new Date('2025-06-19'),
    lastUsedBy: 'John Doe',
    application: 'Application',
    status: 'Ready for Learning'
  },
  {
    name: 'Medo-local',
    dateCreated: new Date('2025-06-19'),
    lastUsed: new Date('2025-06-19'),
    lastUsedBy: 'Antonio Boulos',
    application: 'Application',
    status: 'Ready to Fly'
  },
  {
    name: 'Workshop_01',
    dateCreated: new Date('2025-06-12'),
    lastUsed: new Date('2025-06-13'),
    lastUsedBy: 'Khalil Naim',
    application: 'Application',
    status: 'In Progress'
  },
  {
    name: 'ENEC P3',
    dateCreated: new Date('2025-06-15'),
    lastUsed: new Date('2025-06-19'),
    lastUsedBy: 'Mohamed Abu Saleh',
    application: 'Application',
    status: 'Template Only'
  },
  {
    name: 'ADASI',
    dateCreated: new Date('2025-06-15'),
    lastUsed: new Date('2025-06-19'),
    lastUsedBy: 'Khalil Naim',
    application: 'Application',
    status: 'Ready but Unlicensed'
  },
  {
    name: 'Skyhawk Mk2',
    dateCreated: new Date('2025-06-10'),
    lastUsed: new Date('2025-06-18'),
    lastUsedBy: 'Antonio Boulos',
    application: 'Surveillance',
    status: 'Ready to Fly'
  },
  {
    name: 'FalconEye',
    dateCreated: new Date('2025-06-11'),
    lastUsed: new Date('2025-06-20'),
    lastUsedBy: 'John Doe',
    application: 'Inspection',
    status: 'Ready for Learning'
  },
  {
    name: 'Desert_Alpha',
    dateCreated: new Date('2025-06-09'),
    lastUsed: new Date('2025-06-17'),
    lastUsedBy: 'Mohamed Abu Saleh',
    application: 'Recon',
    status: 'Template Only'
  },
  {
    name: 'Drone_Raptor',
    dateCreated: new Date('2025-06-08'),
    lastUsed: new Date('2025-06-18'),
    lastUsedBy: 'Khalil Naim',
    application: 'Application',
    status: 'In Progress'
  },
  {
    name: 'HawkOne_V2',
    dateCreated: new Date('2025-06-07'),
    lastUsed: new Date('2025-06-16'),
    lastUsedBy: 'Antonio Boulos',
    application: 'Mapping',
    status: 'Ready but Unlicensed'
  }
];


