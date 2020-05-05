import {AppInject} from '../app.component';
import {ApiService} from '../service/api/api-service/api.service';
import {TransitionService} from '../service/native/transition-service/transition.service';
import {PreferenceService} from '../service/storage/preference-service/preference.service';
import {Router} from '@angular/router';

export abstract class BaseApp {
    public apiService: ApiService;
    public transitionService: TransitionService;
    public preferenceService: PreferenceService;
    public router: Router;

    protected constructor() {
        this.initServices();
    }

    private initServices() {
        this.transitionService = AppInject.get(TransitionService);
        this.apiService = AppInject.get(ApiService);
        this.preferenceService = AppInject.get(PreferenceService);
        this.router = AppInject.get(Router);
    }

}
