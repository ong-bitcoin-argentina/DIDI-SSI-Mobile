package com.app.didi.di.module

import androidx.lifecycle.ViewModel
import androidx.lifecycle.ViewModelProvider
import com.app.didi.MainViewModel
import com.app.didi.presentation.common.AppViewModelFactory
import com.app.didi.di.base.ViewModelKey
import com.app.didi.presentation.signup.EmailSignupViewModel
import dagger.Binds
import dagger.Module
import dagger.multibindings.IntoMap

@Module
@Suppress("unused")
abstract class ViewModelModule {
    @Binds
    abstract fun bindViewModelFactory(factory: AppViewModelFactory): ViewModelProvider.Factory

    @Binds
    @IntoMap
    @ViewModelKey(MainViewModel::class)
    abstract fun bindMainViewModel(mainViewModel: MainViewModel): ViewModel

    @Binds
    @IntoMap
    @ViewModelKey(EmailSignupViewModel::class)
    abstract fun bindEmailEntryViewModel(emailSignupViewModel: EmailSignupViewModel): ViewModel
}
