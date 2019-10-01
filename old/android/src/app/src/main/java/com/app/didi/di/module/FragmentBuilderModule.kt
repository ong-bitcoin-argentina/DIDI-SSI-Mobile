package com.app.didi.di.module

import com.app.didi.presentation.access.login.LoginEnterPhoneFragment
import com.app.didi.presentation.access.signup.SignupEnterPhoneFragment
import dagger.Module
import dagger.android.ContributesAndroidInjector

/**
 * Crea [Injector][dagger.android.AndroidInjector] para los tipos que se retornan, lo que va a permitir luego inyectar
 * las dependencias a la activity
 */
@Module
abstract class FragmentBuilderModule {
    @ContributesAndroidInjector
    abstract fun contributeLoginEnterPhoneFragment(): LoginEnterPhoneFragment


    @ContributesAndroidInjector
    abstract fun contributeSignupEnterPhoneFragment(): SignupEnterPhoneFragment
}