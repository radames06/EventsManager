import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { NgbModule, NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { CanDeactivateGuard } from './services/can-deactivate.guard';
import { DialogService } from './services/dialog.service';

@NgModule({
    declarations: [
    ],
    imports: [
        FontAwesomeModule,
        FormsModule,
        NgbCollapseModule,
        NgbModule
    ],
    providers: [
        CanDeactivateGuard,
        DialogService
    ],
    exports: [
        FontAwesomeModule,
        FormsModule,
        NgbCollapseModule,
        NgbModule
    ]
})
export class SharedModule {}