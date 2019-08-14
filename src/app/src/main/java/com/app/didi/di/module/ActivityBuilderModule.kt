package com.app.didi.di.module

import com.app.didi.MainActivity
import dagger.Module
import dagger.android.ContributesAndroidInjector

/**
 * Crea [Injector][dagger.android.AndroidInjector] para los tipos que se retornan, lo que va a permitir luego inyectar
 * las dependencias a la activity
 */
@Module
@Suppress("unused")
abstract class ActivityBuilderModule {
    @ContributesAndroidInjector(modules = [FragmentBuilderModule::class])
    abstract fun contributeMainActivity(): MainActivity
}