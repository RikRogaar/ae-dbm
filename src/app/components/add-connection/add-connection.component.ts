import { Component, OnInit, inject } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { SharedModule } from '@shared/modules/shared.module';
import { ConnectionService } from '@shared/services/connection.service';

@Component({
  selector: 'app-add-connection',
  standalone: true,
  imports: [
    SharedModule
  ],
  templateUrl: './add-connection.component.html',
  styleUrl: './add-connection.component.scss'
})
export class AddConnectionComponent implements OnInit {
  private formBuilder = inject(UntypedFormBuilder);
  private connectionService = inject(ConnectionService);
  public form!: UntypedFormGroup;

  ngOnInit(): void {
    this.initForm();
  }

  public submit() {
    if (this.form.valid) {
      this.connectionService.add$.next(this.form.value);
    }
  }

  private initForm(): void {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      host: ['', [Validators.required]],
      port: ['', [Validators.required]],
    });
  }
}
