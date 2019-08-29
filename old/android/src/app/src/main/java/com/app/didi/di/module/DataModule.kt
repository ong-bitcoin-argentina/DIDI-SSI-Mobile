package com.app.didi.di.module

import com.app.didi.MainRepository
import dagger.Module
import dagger.Provides
import javax.inject.Singleton

/**
 * Providers de repositorios
 */
@Module
class DataModule {
    @Singleton
    @Provides
    fun provideMainRepository(): MainRepository {
        return MainRepository()
    }

}