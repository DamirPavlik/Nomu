import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService, Role } from '../../../core/services/aut.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
    private fb = inject(FormBuilder);
	private auth = inject(AuthService);
	private router = inject(Router);

	errorMessage = '';

	form = this.fb.group({
		name: ['', Validators.required],
		email: ['', [Validators.required, Validators.email]],
		password: ['', [Validators.required, Validators.minLength(8)]],
		role: ['customer' as Role, Validators.required],
	});

	submit() {
		if (this.form.invalid) return;
		const  {name, email, password, role} = this.form.getRawValue();

		this.auth.register(email!, password!, name!, role!).subscribe({
			next: () => {
				this.auth.login(email!, password!).subscribe(() => {
					this.auth.fetchMe().subscribe(() => this.router.navigate(["/home"]));
				});
			},
			error: (err) => {
				this.errorMessage = err.status === 400 ? "Email already registered" : "Registration failed";
			},
		});
	}
}
