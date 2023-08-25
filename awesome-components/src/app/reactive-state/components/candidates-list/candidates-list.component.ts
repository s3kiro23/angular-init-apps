import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { CandidatesService } from '../../services/candidates.service';
import { Candidate } from '../../models/candidate.model';

@Component({
    selector: 'app-candidates-list',
    templateUrl: './candidates-list.component.html',
    styleUrls: ['./candidates-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CandidatesListComponent {
    loading$!: Observable<boolean>;
    candidates$!: Observable<Candidate[]>;

    constructor(private candidatesService: CandidatesService) {}

    ngOnInit(): void {
      this.initObservables();
      this.candidatesService.getCandidatesFromServer();
    }

    private initObservables() {
        this.loading$ = this.candidatesService.loading$;
        this.candidates$ = this.candidatesService.candidates$;
    }
}
