export interface Drone {
  name: string;
  dateCreated: Date;
  lastUsed: Date;
  lastUsedBy: string; // ab required kar diya taake sab me aaye
  application: string;
  status: 'Ready to Fly' | 'Ready for Learning' | 'Ready but Unlicensed' | 'Template Only' | 'In Progress';
}
