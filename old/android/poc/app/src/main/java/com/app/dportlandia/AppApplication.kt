package com.app.dportlandia

import android.app.Application
import kotlinx.coroutines.GlobalScope
import kotlinx.coroutines.launch
import me.uport.sdk.Configuration
import me.uport.sdk.Uport
import me.uport.sdk.core.Networks

class AppApplication: Application() {
    override fun onCreate() {
        super.onCreate()

        val config = Configuration()
            .setApplicationContext(this)
        Uport.initialize(config)
    }
}