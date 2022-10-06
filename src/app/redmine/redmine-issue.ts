export class RedmineIssue {
  id!: number;
  project!: { id: number; name: string };
  status!: { id: number; name: string };
  autor!: { id: number; name: string };
  assigned_to!: { id: number; name: string };
  fixed_version!: { id: number; name: string };
  subject!: string;
  description!: string;
  created_on!: Date;
  start_date!: Date;
  estimated_hours!: number;
  custom_fields!: [{ id: number; name: string; value: string }];
  journals!: [
    {
      id: number;
      user: { id: number; name: string };
      notes: string;
      created_on: Date;
      details: [
        { property: string; name: string; old_value: number; new_value: number }
      ];
    }
  ];
}
