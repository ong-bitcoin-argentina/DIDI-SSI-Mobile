package com.app.didi.presentation.di

import com.app.didi.AppApplication
import com.app.didi.di.module.*
import dagger.BindsInstance
import dagger.Component
import dagger.android.AndroidInjector
import dagger.android.support.AndroidSupportInjectionModule
import javax.inject.Singleton

@Singleton
@Component(
    modules = [
        AndroidSupportInjectionModule::class,
        AppModule::class,
        ActivityBuilderModule::class,
        ApplicationModule::class,
        DataModule::class
    ]
)
interface AppComponent : AndroidInjector<AppApplication> {

    @Component.Builder
    interface Builder {
        @BindsInstance
        fun application(application: AppApplication): Builder

        fun build(): AppComponent
    }

}

