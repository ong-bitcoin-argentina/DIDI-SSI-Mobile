package com.app.didi.di.module

import android.app.Application
import android.content.Context
import com.app.didi.AppApplication
import com.app.didi.di.base.ApplicationContext
import dagger.Module
import dagger.Provides

@Module
@Suppress("unused")
class ApplicationModule {
    /**
     * Importante: agregar la anotation @ApplicationContext donde se inyecta
     */
    @Provides
    @ApplicationContext
    internal fun provideContext(appApplication: AppApplication): Context {
        return appApplication.applicationContext
    }

    @Provides
    internal fun provideApplication(appApplication: AppApplication): Application {
        return appApplication
    }

}