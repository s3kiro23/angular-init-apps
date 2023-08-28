import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable, combineLatest, startWith } from 'rxjs';
import { CandidatesService } from '../../services/candidates.service';
import { Candidate } from '../../models/candidate.model';
import { FormControl, FormBuilder } from '@angular/forms';
import { CandidateSearchType } from '../../enums/candidate-search-type.enum';
import { map } from 'rxjs/operators';

@Component({
    selector: 'app-candidates-list',
    templateUrl: './candidates-list.component.html',
    styleUrls: ['./candidates-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CandidatesListComponent {
    loading$!: Observable<boolean>;
    candidates$!: Observable<Candidate[]>;
    searchCtrl!: FormControl;
    searchTypeCtrl!: FormControl;
    searchTypeOptions!: {
        value: CandidateSearchType;
        label: string;
    }[];

    constructor(
        private candidatesService: CandidatesService,
        private formBuilder: FormBuilder
    ) {}

    ngOnInit(): void {
        this.initForm();
        this.initObservables();
        this.candidatesService.getCandidatesFromServer();
    }

    private initForm() {
        this.searchCtrl = this.formBuilder.control('');
        this.searchTypeCtrl = this.formBuilder.control(
            CandidateSearchType.LASTNAME
        );
        this.searchTypeOptions = [
            { value: CandidateSearchType.LASTNAME, label: 'Nom' },
            { value: CandidateSearchType.FIRSTNAME, label: 'Prénom' },
            { value: CandidateSearchType.COMPANY, label: 'Entreprise' },
        ];
    }

    private initObservables() {
        this.loading$ = this.candidatesService.loading$;
        const search$ = this.searchCtrl.valueChanges.pipe(
            startWith(this.searchCtrl.value),
            map((value) => value.toLowerCase())
        );
        const searchType$: Observable<CandidateSearchType> =
            this.searchTypeCtrl.valueChanges.pipe(
                startWith(this.searchTypeCtrl.value)
            );
        this.candidates$ = combineLatest([
            search$,
            searchType$,
            this.candidatesService.candidates$,
        ]).pipe(
            map(([search, searchType, candidates]) =>
                candidates.filter((candidate) =>
                    candidate[searchType]
                        .toLowerCase()
                        .includes(search as string)
                )
            )
        );
    }
}
