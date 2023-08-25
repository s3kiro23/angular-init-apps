import { Component, OnInit } from '@angular/core';
import {
    AbstractControl,
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map, tap } from 'rxjs/operators';
import { ComplexFormService } from '../../services/complex-form.service';
import { confirmEqualValidator } from '../../validators/confirm-equal.validator';

@Component({
    selector: 'app-complex-form',
    templateUrl: './complex-form.component.html',
    styleUrls: ['./complex-form.component.scss'],
})
export class ComplexFormComponent implements OnInit {
    loading = false;

    mainForm!: FormGroup;
    personnalInforForm!: FormGroup;
    contactPreferenceCtrl!: FormControl;
    phoneCtrl!: FormControl;
    emailCtrl!: FormControl;
    confirmEmailCtrl!: FormControl;
    emailForm!: FormGroup;
    usernameCtrl!: FormControl;
    passwordCtrl!: FormControl;
    confirmPasswordCtrl!: FormControl;
    loginInfoForm!: FormGroup;

    showEmailCtrl$!: Observable<boolean>;
    showPhoneCtrl$!: Observable<boolean>;

    showEmailError$!: Observable<boolean>;
    showPasswordError$!: Observable<boolean>;

    constructor(
        private formBuilder: FormBuilder,
        private complexFormService: ComplexFormService
    ) {}

    ngOnInit() {
        this.initFormControls();
        this.initMainForm();
        this.initFormObservables();
    }

    private initMainForm(): void {
        this.mainForm = this.formBuilder.group({
            personalInfo: this.personnalInforForm,
            contactPreference: this.contactPreferenceCtrl,
            email: this.emailForm,
            phone: this.phoneCtrl,
            loginInfo: this.loginInfoForm,
        });
    }

    private initFormControls(): void {
        this.personnalInforForm = this.formBuilder.group({
            firstname: ['', Validators.required],
            lastname: ['', Validators.required],
        });
        this.contactPreferenceCtrl = this.formBuilder.control('email');
        this.phoneCtrl = this.formBuilder.control('');
        this.emailCtrl = this.formBuilder.control('');
        this.confirmEmailCtrl = this.formBuilder.control('');
        this.emailForm = this.formBuilder.group(
            {
                email: this.emailCtrl,
                confirm: this.confirmEmailCtrl,
            },
            {
                validators: [confirmEqualValidator('email', 'confirm')],
                updateOn: 'blur',
            }
        );
        this.showEmailError$ = this.emailForm.statusChanges.pipe(
            map(
                (status) =>
                    status === 'INVALID' &&
                    this.emailCtrl.value &&
                    this.confirmEmailCtrl.value
            )
        );
        this.passwordCtrl = this.formBuilder.control('', [Validators.required]);
        this.confirmPasswordCtrl = this.formBuilder.control('', [
            Validators.required,
        ]);
        this.usernameCtrl = this.formBuilder.control('', [Validators.required]);
        this.loginInfoForm = this.formBuilder.group(
            {
                username: this.usernameCtrl,
                password: this.passwordCtrl,
                confirmPassword: this.confirmPasswordCtrl,
            },
            {
                validators: [
                    confirmEqualValidator('password', 'confirmPassword'),
                ],
                updateOn: 'blur',
            }
        );
        this.showPasswordError$ = this.loginInfoForm.statusChanges.pipe(
            map(
                (status) =>
                    status === 'INVALID' &&
                    this.passwordCtrl.value &&
                    this.confirmPasswordCtrl.value &&
                    this.loginInfoForm.hasError('confirmEqual')
            )
        );
    }

    private initFormObservables(): void {
        this.showEmailCtrl$ = this.contactPreferenceCtrl.valueChanges.pipe(
            startWith(this.contactPreferenceCtrl.value),
            map((preference) => preference === 'email'),
            tap((showEmailCtrl) => this.setEmailValidators(showEmailCtrl))
        );
        this.showPhoneCtrl$ = this.contactPreferenceCtrl.valueChanges.pipe(
            startWith(this.contactPreferenceCtrl.value),
            map((preference) => preference === 'phone'),
            tap((showPhoneCtrl) => this.setPhoneValidators(showPhoneCtrl))
        );
    }

    private setEmailValidators(showEmailCtrl: boolean): void {
        if (showEmailCtrl) {
            this.emailCtrl.addValidators([
                Validators.required,
                Validators.email,
            ]);
            this.confirmEmailCtrl.addValidators([
                Validators.required,
                Validators.email,
            ]);
        } else {
            this.emailCtrl.clearValidators();
            this.confirmEmailCtrl.clearValidators();
        }
        this.emailCtrl.updateValueAndValidity();
        this.confirmEmailCtrl.updateValueAndValidity();
    }

    private setPhoneValidators(showPhoneCtrl: boolean): void {
        if (showPhoneCtrl) {
            this.phoneCtrl.addValidators([
                Validators.required,
                Validators.minLength(10),
                Validators.maxLength(10),
            ]);
        } else {
            this.phoneCtrl.clearValidators();
        }
        this.phoneCtrl.updateValueAndValidity();
    }

    getFormControlErrorText(ctrl: AbstractControl) {
        if (ctrl.hasError('required')) {
            return 'Ce champ est requis';
        } else if (ctrl.hasError('email')) {
            return "Merci d'entrer une adresse email valide";
        } else if (ctrl.hasError('minlength')) {
            return 'Ce numéro de télépone ne contient pas assez de chiffres';
        } else if (ctrl.hasError('maxlength')) {
            return 'Ce numéro de télépone contient trop de chiffres';
        } else if (ctrl.hasError('validValidator')) {
            return 'Ce texte ne contient pas le mot VALID';
        } else {
            return 'Ce champ contient une erreur';
        }
    }

    onSubmitForm() {
        this.loading = true;
        this.complexFormService
            .saveUserInfo(this.mainForm.value)
            .pipe(
                tap((saved) => {
                    this.loading = false;
                    if (!saved) {
                        console.log("Echec de l'enregistrement");
                        return;
                    }
                    this.resetForm();
                })
            )
            .subscribe();
    }

    private resetForm(): void {
        this.mainForm.reset();
        this.contactPreferenceCtrl.patchValue('email');
    }
}
