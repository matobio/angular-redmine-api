import { RedmineIssue } from './redmine/redmine-issue';
import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RedmineService } from './redmine/redmine.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();

  title = 'redmine-tracker';
  submitted = false;
  loading = false;

  redmineForm!: FormGroup;

  constructor(private redmineService: RedmineService) {}
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

      let issues: RedmineIssue[] = [];

      this.loading = true;
      this.redmineService.getIssuesData(redmine_url, redmine_api_key).subscribe(
        (data) => {
          issues = data;
          this.loading = false;
          console.log(issues[0]);
        },
        (error) => {
          this.loading = false;
        }
      );
    }
  }
  ngOnDestroy(): void {
    this.submitted = false;
    this.loading = false;

    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
