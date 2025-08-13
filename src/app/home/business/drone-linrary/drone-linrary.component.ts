import { Component, ElementRef, HostListener, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DRONES } from 'src/app/core/data/mock-drones';
import { Drone } from 'src/app/core/models/drone-library.model';

@Component({
  selector: 'app-drone-linrary',
  templateUrl: './drone-linrary.component.html',
  styleUrls: ['./drone-linrary.component.scss'],
})
export class DroneLinraryComponent  implements OnInit {
 drones: Drone[] = DRONES;
  filteredDrones: Drone[] = [];
  searchText: string = '';
  selectedTabIndex: number = 0;
  selectedFilter: string = '';
  openDropdown: string | null = null;
  tabs: (string | '')[] = [
    '', // All
    'Ready to Fly',
    'Ready for Learning',
    'Ready but Unlicensed',
    'Template Only',
    'In Progress',
  ];
  filterOptions = ['All Applications', 'Application', 'Something Else'];
filterControl = new FormControl('');

  underlineLeft = '0px';
  underlineWidth = '0px';
  @ViewChild('tabsContainer') tabsContainer!: ElementRef;
  tabElements: HTMLElement[] = [];
  startX = 0;
  currentX = 0;
  isSwiping = false;
  underlineOffset = 0;
  @ViewChildren('dropdownRef') dropdownRefs!: QueryList<ElementRef>;

  constructor(private eRef: ElementRef) {}

  toggleDropdown(droneName: string): void {
    this.openDropdown = this.openDropdown === droneName ? null : droneName;
  }

  @HostListener('document:click', ['$event'])
  clickOutside(event: Event): void {
    // Give toggleDropdown time to run first
    setTimeout(() => {
      const clickedInside = this.dropdownRefs.some((ref) =>
        ref.nativeElement.contains(event.target)
      );

      if (!clickedInside) {
        this.openDropdown = null;
      }
    }, 0);
  }

  ngOnInit(): void {
    this.filteredDrones = [...this.drones];
    this.selectedTabIndex = 0;
    this.filterByTab(0);
  }

  applyFilter(): void {
    const term = this.searchText.toLowerCase();
    this.filteredDrones = this.drones.filter((drone) => {
      const matchSearch = drone.name.toLowerCase().includes(term);
      const matchFilter =
        !this.selectedFilter || drone.application === this.selectedFilter;
      const matchTab =
        this.selectedTabIndex === 0 ||
        drone.status === this.tabs[this.selectedTabIndex];
      return matchSearch && matchFilter && matchTab;
    });
  }

  filterByTab(index: number): void {
    this.selectedTabIndex = index;
    const status = this.tabs[index];

    this.filteredDrones = this.drones.filter((drone) => {
      const matchStatus = !status || drone.status === status;
      const matchSearch = drone.name
        .toLowerCase()
        .includes(this.searchText.toLowerCase());
      return matchStatus && matchSearch;
    });
  }

  statusClass(status: string): string {
    const map: { [key: string]: string } = {
      'Ready to Fly': 'bg-green-100 text-green-800',
      'Ready for Learning': 'bg-blue-100 text-blue-800',
      'Ready but Unlicensed': 'bg-yellow-100 text-yellow-800',
      'Template Only': 'bg-gray-100 text-gray-800',
      'In Progress': 'bg-orange-100 text-orange-800',
    };
    return map[status] || 'bg-gray-200 text-gray-800';
  }

  ngAfterViewInit() {
    this.tabElements = Array.from(
      this.tabsContainer.nativeElement.querySelectorAll('button')
    );

    // Double check after view renders
    setTimeout(() => {
      this.updateUnderlinePosition();
    }, 100); // Slight delay to ensure all elements are ready
  }

  updateUnderlinePosition() {
    if (!this.tabsContainer?.nativeElement) return;

    const tabs = this.tabsContainer.nativeElement.querySelectorAll('button');
    if (tabs.length > 0 && this.selectedTabIndex < tabs.length) {
      const selectedTab = tabs[this.selectedTabIndex];
      const tabRect = selectedTab.getBoundingClientRect();
      const containerRect =
        this.tabsContainer.nativeElement.getBoundingClientRect();

      this.underlineWidth = tabRect.width + 'px';
      this.underlineOffset = tabRect.left - containerRect.left;
    }
  }

  selectTab(index: number) {
    this.selectedTabIndex = index;
    this.filterByTab(index);
    this.updateUnderlinePosition();
  }
  // Touch events for swipe
  @HostListener('touchstart', ['$event'])
  onTouchStart(event: TouchEvent) {
    this.startX = event.touches[0].clientX;
    this.currentX = this.startX;
    this.isSwiping = true;
  }

  @HostListener('touchmove', ['$event'])
  onTouchMove(event: TouchEvent) {
    if (!this.isSwiping) return;
    this.currentX = event.touches[0].clientX;

    // Calculate swipe distance
    const diff = this.currentX - this.startX;
    const maxIndex = this.tabs.length - 1;

    // Calculate potential new index based on swipe
    let newIndex = this.selectedTabIndex;
    if (diff < -50 && this.selectedTabIndex < maxIndex) {
      newIndex = this.selectedTabIndex + 1;
    } else if (diff > 50 && this.selectedTabIndex > 0) {
      newIndex = this.selectedTabIndex - 1;
    }

    // Update underline position during swipe
    if (newIndex !== this.selectedTabIndex) {
      const targetTab = this.tabElements[newIndex];
      const containerRect =
        this.tabsContainer.nativeElement.getBoundingClientRect();
      const tabRect = targetTab.getBoundingClientRect();

      // Animate the underline towards the target tab
      this.underlineLeft = tabRect.left - containerRect.left + 'px';
      this.underlineWidth = tabRect.width + 'px';
    }
  }

  @HostListener('touchend')
  onTouchEnd() {
    if (!this.isSwiping) return;
    this.isSwiping = false;

    // Calculate swipe distance
    const diff = this.currentX - this.startX;
    const maxIndex = this.tabs.length - 1;

    // Change tab if swipe was significant enough
    if (diff < -50 && this.selectedTabIndex < maxIndex) {
      this.selectTab(this.selectedTabIndex + 1);
    } else if (diff > 50 && this.selectedTabIndex > 0) {
      this.selectTab(this.selectedTabIndex - 1);
    } else {
      // Return to original position if swipe wasn't enough
      this.updateUnderlinePosition();
    }
  }

}
