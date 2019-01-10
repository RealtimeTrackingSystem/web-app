import { Component, OnInit, ElementRef, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { SessionActionCreator } from '../../../store/action-creators';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

declare var $: any;

@Component({
    selector: 'app-login-cmp',
    templateUrl: './login.component.html'
})

export class LoginComponent implements OnInit, OnDestroy {
    test: Date = new Date();
    private toggleButton: any;
    private sidebarVisible: boolean;
    private nativeElement: Node;
    public signInForm: FormGroup;

    constructor(
      private element: ElementRef,
      private formBuilder: FormBuilder,
      private sessionActionCreator: SessionActionCreator,
      public router: Router
    ) {
        this.nativeElement = element.nativeElement;
        this.sidebarVisible = false;
    }

    ngOnInit() {
      this.sessionActionCreator.Logout();
      this.signInForm = this.formBuilder.group({
        loginName: [null, Validators.required],
        password: [null, Validators.required]
      });
      var navbar : HTMLElement = this.element.nativeElement;
      this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];
      const body = document.getElementsByTagName('body')[0];
      body.classList.add('login-page');
      body.classList.add('off-canvas-sidebar');
      const card = document.getElementsByClassName('card')[0];
      setTimeout(function() {
          // after 1000 ms we add the class animated to the login/register card
          card.classList.remove('card-hidden');
      }, 700);
    }
    sidebarToggle() {
        var toggleButton = this.toggleButton;
        var body = document.getElementsByTagName('body')[0];
        var sidebar = document.getElementsByClassName('navbar-collapse')[0];
        if (this.sidebarVisible == false) {
            setTimeout(function() {
                toggleButton.classList.add('toggled');
            }, 500);
            body.classList.add('nav-open');
            this.sidebarVisible = true;
        } else {
            this.toggleButton.classList.remove('toggled');
            this.sidebarVisible = false;
            body.classList.remove('nav-open');
        }
    }
    ngOnDestroy() {
      const body = document.getElementsByTagName('body')[0];
      body.classList.remove('login-page');
      body.classList.remove('off-canvas-sidebar');
    }

    submit() {
      if (this.signInForm.valid) {
        this.sessionActionCreator.Login(this.signInForm.value)
          .toPromise()
          .then(result => {
            if (result.token) {
              if (result.user && result.user.accessLevel.toUpperCase() === 'ADMIN') {
                this.router.navigate([`/admin`]);
              } else {
                this.router.navigate([`/public`]);
              }
            } else {
              return swal('Invalid Credentials', 'Invalid Username/ Email or password', 'warning');
            }
          })
          .catch(err => {
            return swal('Unavailable', 'System is temporarily unavailable', 'error');
          });
      } else {
        return swal('Invalid Form', 'Please complete the form', 'info');
      }
    }

    forgotPassword() {
      this.router.navigate([`/auth/forgot-password`])
    }
}
