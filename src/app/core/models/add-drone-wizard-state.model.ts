import { Step } from './add-drone-stepper.model';

export type WizardFlow =
  | 'yes'
  | 'no'
  | 'indoors_yes'
  | 'outdoors_yes'
  | 'indoors_no'
  | 'outdoors_no'
  | 'new_template'
  | 'existing_template'
  | 'custom'
  | 'organization'
  | 'marketplaceTemplate'
  | 'droneMarketplace'
  | 'tier1'
  | 'tier2'
  | 'already'
  | null;

export type StepType =
  | 'initial'
  | 'environment'
  | 'indoors_setup'
  | 'outdoors_setup'
  | 'template_selection'
  | 'select_drone'
  | 'custom_drone'
  | 'organization_flow'
  | 'marketplaceTemplate_flow'
  | 'droneMarketplace_flow'
  | 'drone_method'
  | 'tier_one'
  | 'template_type'
  | 'create_template'
  | 'template_form'
  | 'calibration_overview'
  | 'motor_test'
  | 'set_up_remote_control'
  | 'create_remote_flow'
  | 'test_remote_control'
  | 'use_existing_remote'
  | 'existing_template_flow'
  | 'create_remote_flow'
  | 'use_existing_remote'
  | 'no_flow_start'
  | 'no_flow_environment'
  | 'no_flow_indoors_setup'
  | 'no_flow_outdoors_setup'
  | 'set_up_kill_switch'
  | 'setup_functional_switch'
  | 'rc-setup-switch-b'
  | 'license-now-or-later'
  | 'license-now'
  | 'licence-flight-setup';

export interface StepNode {
  type: StepType;
  flow: WizardFlow;
  parent?: StepType; // For back navigation
  data?: any; // Step-specific data
}

export interface AddDroneWizardState {
  currentStep: StepType;
  stepHistory: StepType[]; // For back navigation
  selectedFlow: WizardFlow;
  steps: Step[];
  stepData: { [stepType: string]: any };
}
