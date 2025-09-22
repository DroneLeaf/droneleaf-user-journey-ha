import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { timer } from 'rxjs';

// CodeMirror imports
import { EditorState, Extension } from '@codemirror/state';
import { EditorView, keymap, lineNumbers, highlightActiveLine } from '@codemirror/view';
import { defaultKeymap, indentWithTab } from '@codemirror/commands';
import { python } from '@codemirror/lang-python';
import { lintGutter, linter, Diagnostic } from '@codemirror/lint';

interface Drone {
  id: string;
  name: string;
}

interface DroneOption {
  value: string;
  label: string;
}

interface MissionTemplate {
  id: string;
  name: string;
  date: string;
  validated: boolean;
}

@Component({
  selector: 'app-mission-management',
  templateUrl: './mission-management.component.html',
  styleUrls: ['./mission-management.component.scss'],
})
export class MissionManagementComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('editorContainer') editorContainer!: ElementRef<HTMLDivElement>;
  // Form controls
  missionForm: FormGroup;
  missionNameControl: FormControl;
  missionDescriptionControl: FormControl;
  selectedDroneControl: FormControl;

  // Code editor
  missionCode: string = `# DroneLeaf - Leaf SDK Mission Script
# Write your mission below. Validate before uploading or templating.

import leafsdk as leaf

# Required entry point
def run_mission(ctx: leaf.Context):
    # 1) arm, 2) takeoff, 3) hover, 4) land (example only)
    ctx.arm()
    ctx.takeoff(altitude_m=1.5)
    ctx.hover(seconds=3)
    ctx.land()

if __name__ == "__main__":
    leaf.run(run_mission)
`;

  // CodeMirror editor
  private editorView: EditorView | null = null;
  syntaxErrors: Diagnostic[] = [];
  hasErrors: boolean = false;

  // Detailed error information for display
  errorDetails: { line: number; message: string }[] = [];

  // Validation states
  isValidating: boolean = false;
  validationSuccess: boolean = false;
  validationError: boolean = false;
  validationStatus: string = 'Needs Validation';

  // Template search
  searchQuery: string = '';

  // Mock data
  drones: Drone[] = [
    { id: 'drone1', name: 'Phantom 4 Pro' },
    { id: 'drone2', name: 'Mavic Air 2' },
    { id: 'drone3', name: 'Inspire 2' },
    { id: 'drone4', name: 'Matrice 300 RTK' }
  ];

  // Select options
  droneOptions: DroneOption[] = [];

  missionTemplates: MissionTemplate[] = [
    { id: 'template1', name: 'Indoor Hover - v1', date: '02/08/25 10:05', validated: true },
    { id: 'template2', name: 'Inspection Loop', date: '02/08/25 10:05', validated: true },
    { id: 'template3', name: 'Warehouse Pick', date: '02/08/25 10:05', validated: true },
    { id: 'template4', name: 'Indoor Hover - v1', date: '02/08/25 10:05', validated: true },
    { id: 'template5', name: 'Indoor Hover - v1', date: '02/08/25 10:05', validated: true },
    { id: 'template6', name: 'Indoor Hover - v1', date: '02/08/25 10:05', validated: true }
  ];

  constructor(private fb: FormBuilder) {
    // Initialize form controls
    this.missionNameControl = new FormControl('', [Validators.required]);
    this.missionDescriptionControl = new FormControl('', [Validators.required]);
    this.selectedDroneControl = new FormControl('', [Validators.required]);

    this.missionForm = this.fb.group({
      missionName: this.missionNameControl,
      missionDescription: this.missionDescriptionControl,
      selectedDrone: this.selectedDroneControl
    });
  }

  ngOnInit() {
    this.initializeDroneOptions();
  }

  ngAfterViewInit() {
    // Initialize CodeMirror
    this.initCodeMirror();
  }

  ngOnDestroy() {
    // Cleanup CodeMirror
    if (this.editorView) {
      this.editorView.destroy();
    }
  }

  // Initialize CodeMirror editor
  initCodeMirror() {
    if (!this.editorContainer) return;

    // Python syntax linter
    const pythonLinter = linter((view) => {
      const diagnostics: Diagnostic[] = [];
      const code = view.state.doc.toString();

      try {
        // Simple Python syntax checking
        // In a real app, you would use a more sophisticated linter
        // This is just a basic implementation

        // Check for common syntax errors
        const lines = code.split('\n');
        lines.forEach((line, i) => {
          // Check for unbalanced parentheses
          const openParens = (line.match(/\(/g) || []).length;
          const closeParens = (line.match(/\)/g) || []).length;

          if (openParens !== closeParens) {
            diagnostics.push({
              from: view.state.doc.line(i + 1).from,
              to: view.state.doc.line(i + 1).to,
              severity: 'error',
              message: 'Unbalanced parentheses'
            });
          }

          // Check for unbalanced brackets
          const openBrackets = (line.match(/\[/g) || []).length;
          const closeBrackets = (line.match(/\]/g) || []).length;

          if (openBrackets !== closeBrackets) {
            diagnostics.push({
              from: view.state.doc.line(i + 1).from,
              to: view.state.doc.line(i + 1).to,
              severity: 'error',
              message: 'Unbalanced brackets'
            });
          }

          // Check for unbalanced braces
          const openBraces = (line.match(/\{/g) || []).length;
          const closeBraces = (line.match(/\}/g) || []).length;

          if (openBraces !== closeBraces) {
            diagnostics.push({
              from: view.state.doc.line(i + 1).from,
              to: view.state.doc.line(i + 1).to,
              severity: 'error',
              message: 'Unbalanced braces'
            });
          }

          // Check for invalid indentation (simple check)
          if (line.trim() && line.length > 0 && line[0] !== ' ' && line[0] !== '#' &&
              i > 0 && lines[i-1].trim().endsWith(':')) {
            diagnostics.push({
              from: view.state.doc.line(i + 1).from,
              to: view.state.doc.line(i + 1).to,
              severity: 'error',
              message: 'Expected indentation after colon'
            });
          }

          // Check for invalid Python syntax (very basic)
          if (line.includes('import') && !line.startsWith('import ') && !line.startsWith('from ') && !line.startsWith('#')) {
            diagnostics.push({
              from: view.state.doc.line(i + 1).from,
              to: view.state.doc.line(i + 1).to,
              severity: 'error',
              message: 'Invalid import statement'
            });
          }

          // Check for missing colons in function/class definitions and control statements
          if ((line.trim().startsWith('def ') || line.trim().startsWith('class ') ||
               line.trim().startsWith('if ') || line.trim().startsWith('elif ') ||
               line.trim().startsWith('else') || line.trim().startsWith('for ') ||
               line.trim().startsWith('while ')) && !line.trim().endsWith(':')) {
            diagnostics.push({
              from: view.state.doc.line(i + 1).from,
              to: view.state.doc.line(i + 1).to,
              severity: 'error',
              message: 'Missing colon at the end of statement'
            });
          }

          // Check for invalid function calls (very basic)
          const functionCallMatch = line.match(/(\w+)\s*\(/);
          if (functionCallMatch && functionCallMatch[1] &&
              ['print', 'len', 'range', 'str', 'int', 'float', 'list', 'dict', 'set', 'tuple',
               'min', 'max', 'sum', 'sorted', 'any', 'all', 'enumerate', 'zip', 'map', 'filter',
               'round', 'abs', 'pow', 'run_mission', 'arm', 'takeoff', 'hover', 'land'].indexOf(functionCallMatch[1]) === -1 &&
              !line.includes('def ' + functionCallMatch[1]) &&
              !lines.some(l => l.includes('def ' + functionCallMatch[1]))) {

            // Check if it's likely a method call (obj.method())
            const isLikelyMethodCall = line.includes('.' + functionCallMatch[1]);

            if (!isLikelyMethodCall) {
              diagnostics.push({
                from: view.state.doc.line(i + 1).from + line.indexOf(functionCallMatch[1]),
                to: view.state.doc.line(i + 1).from + line.indexOf(functionCallMatch[1]) + functionCallMatch[1].length,
                severity: 'warning',
                message: `Function '${functionCallMatch[1]}' might not be defined`
              });
            }
          }
        });

      } catch (e) {
        // If there's an error in our linting logic, don't crash
        console.error('Error in Python linter:', e);
      }

      // Update component state with errors
      this.syntaxErrors = diagnostics;
      this.hasErrors = diagnostics.length > 0;

      // Extract line numbers and messages for display
      this.errorDetails = diagnostics.map(diagnostic => {
        const line = view.state.doc.lineAt(diagnostic.from);
        return {
          line: line.number,
          message: diagnostic.message
        };
      });

      return diagnostics;
    });

    // CodeMirror extensions
    const extensions: Extension[] = [
      lineNumbers(),
      highlightActiveLine(),
      python(),
      keymap.of([...defaultKeymap, indentWithTab]),
      EditorView.updateListener.of(update => {
        if (update.docChanged) {
          // Update the mission code when the editor content changes
          this.missionCode = update.state.doc.toString();

          // Reset validation status
          if (this.validationSuccess || this.validationError) {
            this.validationSuccess = false;
            this.validationError = false;
            this.validationStatus = 'Needs Validation';
          }
        }
      }),
      lintGutter(),
      pythonLinter
    ];

    // Create editor state
    const state = EditorState.create({
      doc: this.missionCode,
      extensions
    });

    // Create editor view
    this.editorView = new EditorView({
      state,
      parent: this.editorContainer.nativeElement
    });
  }

  // Initialize drone options for select input
  initializeDroneOptions() {
    this.droneOptions = this.drones.map(drone => ({
      value: drone.id,
      label: drone.name
    }));
  }

  // No longer needed with CodeMirror
  // Keeping empty methods to avoid breaking any references
  onCodeChange(): void {
    // Reset validation status when code changes
    if (this.validationSuccess || this.validationError) {
      this.validationSuccess = false;
      this.validationError = false;
      this.validationStatus = 'Needs Validation';
    }
  }

  // Getter for filtered templates based on search query
  get filteredTemplates(): MissionTemplate[] {
    if (!this.searchQuery) {
      return this.missionTemplates;
    }

    const query = this.searchQuery.toLowerCase();
    return this.missionTemplates.filter(template =>
      template.name.toLowerCase().includes(query)
    );
  }

  // Validate the script
  validateScript(): void {
    // Reset validation states
    this.isValidating = true;
    this.validationSuccess = false;
    this.validationError = false;
    this.validationStatus = 'Validating...';

    // Simulate validation process with timer
    timer(2000).subscribe(() => {
      // Check if the script has the required entry point
      const scriptHasEntryPoint = this.missionCode.includes('if __name__ == "__main__"') &&
                                 this.missionCode.includes('leaf.run(run_mission)');

      // Check if there are any syntax errors
      if (this.hasErrors) {
        this.validationSuccess = false;
        this.validationError = true;

        // Set status to show the number of errors
        if (this.errorDetails.length === 1) {
          this.validationStatus = '1 Syntax Error';
        } else {
          this.validationStatus = `${this.errorDetails.length} Syntax Errors`;
        }

        // If we have the editor view, highlight the error lines
        if (this.editorView) {
          // Focus on the first error
          if (this.syntaxErrors.length > 0) {
            const firstError = this.syntaxErrors[0];
            this.editorView.dispatch({
              selection: { anchor: firstError.from, head: firstError.to },
              scrollIntoView: true
            });
          }
        }
      } else if (scriptHasEntryPoint) {
        this.validationSuccess = true;
        this.validationError = false;
        this.validationStatus = 'Validated';
      } else {
        this.validationSuccess = false;
        this.validationError = true;
        this.validationStatus = 'Missing Entry Point';
      }

      this.isValidating = false;
    });
  }

  // Create a mission template
  createMissionTemplate(): void {
    if (!this.validationSuccess || !this.missionForm.valid) return;

    const missionName = this.missionNameControl.value;

    // Implementation for creating a mission template
    console.log('Creating mission template:', missionName);

    // In a real app, you would save the template to a service/backend
    const newTemplate: MissionTemplate = {
      id: `template${this.missionTemplates.length + 1}`,
      name: missionName,
      date: new Date().toLocaleDateString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      }),
      validated: true
    };

    this.missionTemplates.unshift(newTemplate);
  }

  // Upload the mission
  uploadMission(): void {
    if (!this.validationSuccess || !this.missionForm.valid) return;

    const missionName = this.missionNameControl.value;
    const missionDescription = this.missionDescriptionControl.value;
    const selectedDrone = this.selectedDroneControl.value;

    // Implementation for uploading the mission
    console.log('Uploading mission:', {
      name: missionName,
      description: missionDescription,
      drone: selectedDrone,
      code: this.missionCode
    });

    // In a real app, you would upload to a service/backend
    alert('Mission uploaded successfully!');
  }
}
