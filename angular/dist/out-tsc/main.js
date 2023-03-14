import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment.prod';
platformBrowserDynamic().bootstrapModule(AppModule)
    .catch(err => console.error(err));
if (environment.production) {
    enableProdMode();
}
//# sourceMappingURL=main.js.map