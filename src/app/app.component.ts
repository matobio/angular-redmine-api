import { RedmineIssue } from './redmine/redmine-issue';
import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RedmineService } from './redmine/redmine.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  @ViewChild('submitButton', { static: false })
  button!: ElementRef;

  redmine_url = 'https://projects.imatia.com';
  subscription: Subscription = new Subscription();

  title = 'redmine-tracker';
  submitted = false;
  loading = false;
  hoverState: boolean = true;
  hover: boolean = false;
  issues: RedmineIssue[] = [];

  redmineForm!: FormGroup;

  constructor(
    private redmineService: RedmineService,
    private renderer: Renderer2
  ) {}
  ngOnInit(): void {
    this.initForm();
  }
  private initForm() {
    this.redmineForm = new FormGroup({
      redmine_url: new FormControl('', Validators.required),
      redmine_api_key: new FormControl('', Validators.required),
      from: new FormControl(),
      until: new FormControl(),
    });
  }

  get registerFormControl() {
    return this.redmineForm.controls;
  }
  onSubmit(): void {
    this.submitted = true;
    if (this.redmineForm.valid) {
      let redmine_url: string = this.redmineForm.value.redmine_url;
      let redmine_api_key: string = this.redmineForm.value.redmine_api_key;

      this.issues = [];

      this.loading = true;
      this.redmineService.getIssuesData(redmine_url, redmine_api_key).subscribe(
        (data) => {
          this.issues = data;
          this.setInitialState();
          console.log(this.issues[0]);
        },
        (error) => {
          this.setInitialState();
        }
      );
    }
  }

  setInitialState() {
    this.loading = false;
    this.hover = false;
    this.submitted = false;
  }
  ngOnDestroy(): void {
    this.submitted = false;
    this.loading = false;

    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  onMouseOver(event: any): void {
    this.hover = true;

    if (this.redmineForm.invalid) {
      this.renderer.setStyle(
        this.button.nativeElement,
        'margin',
        this.hoverState ? '0px 300px 0px 0px' : '0px 0px 0px 300px'
      );

      this.hoverState = !this.hoverState;
    }
  }
}
