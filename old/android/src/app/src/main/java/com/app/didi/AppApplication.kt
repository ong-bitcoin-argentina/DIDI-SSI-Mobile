package com.app.didi

import com.app.didi.di.DaggerAppComponent
import dagger.android.DaggerApplication

class AppApplication : DaggerApplication() {
	private val applicationInjector = DaggerAppComponent
			.builder()
			.application(this)
			.build()

	override fun applicationInjector() = applicationInjector
}
