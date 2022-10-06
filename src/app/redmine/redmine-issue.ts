export class RedmineIssue {
  id!: number;
  project!: { id: number; name: string };
  status!: { id: number; name: string };
  autor!: { id: number; name: string };
  created_on!: Date;
}
