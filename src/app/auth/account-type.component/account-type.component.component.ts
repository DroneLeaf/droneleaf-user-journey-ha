import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account-type.component',
  templateUrl: './account-type.component.component.html',
  styleUrls: ['./account-type.component.component.scss'],
})
export class AccountTypeComponent  implements OnInit {

 selectedType: 'private' | 'business' | null = null;

  constructor(private router: Router) {}

    ngOnInit() {

  }

selectType(type: 'private' | 'business') {
  this.selectedType = type;
  localStorage.setItem('userRole', type); // 👈 Save role
}


onContinue() {
  if (this.selectedType === 'private') {
    this.router.navigate(['/auth/register']);
  } else if (this.selectedType === 'business') {
    this.router.navigate(['/auth/business-register']);
  }
}

}
