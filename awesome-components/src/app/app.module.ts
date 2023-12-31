import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { ComplexFormModule } from './complex-form/complex-form.module';
import { ReactiveStateModule } from './reactive-state/reactive-state.module';

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        CoreModule,
        SharedModule,
        ComplexFormModule,
        ReactiveStateModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
