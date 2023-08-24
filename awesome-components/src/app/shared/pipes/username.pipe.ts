import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'username',
})
export class UserNamePipe implements PipeTransform {
    transform(
        value: { lastname: string; firstname: string },
        locale: 'en' | 'fr' = 'fr'
    ): string {
        return locale === 'fr'
            ? `${value.lastname.toUpperCase()} ${value.firstname}`
            : `${value.firstname} ${value.lastname}`;
    }
}