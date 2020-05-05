import {Injectable} from '@angular/core';
import {NativePageTransitions, NativeTransitionOptions} from '@ionic-native/native-page-transitions/ngx';
import {environment} from '../../../../environments/environment';
import {ITransition} from '../../../interface/interfaces-funtional';

@Injectable({
    providedIn: 'root'
})
export class TransitionService implements ITransition {

    options: NativeTransitionOptions = {
        direction: environment.transitions.up,
        duration: environment.transitions.duration,
        slowdownfactor: environment.transitions.slowdownfactor,
        slidePixels: environment.transitions.slidePixels,
        iosdelay: environment.transitions.iosdelay,
        androiddelay: environment.transitions.androiddelay,
        fixedPixelsTop: environment.transitions.fixedPixelsTop,
        fixedPixelsBottom: environment.transitions.fixedPixelsBottom
    };

    constructor(private nativePageTransitions: NativePageTransitions) {
    }

    upTransition(): void {
        this.options.direction = environment.transitions.up;
        this.nativePageTransitions.slide(this.options);

    }

    downTransition(): void {
        this.options.direction = environment.transitions.down;
        this.nativePageTransitions.slide(this.options);
    }

    leftTransition(): void {
        this.options.direction = environment.transitions.left;
        this.nativePageTransitions.slide(this.options);
    }

    rightTransition(): void {
        this.options.direction = environment.transitions.right;
        this.nativePageTransitions.slide(this.options);
    }
}
