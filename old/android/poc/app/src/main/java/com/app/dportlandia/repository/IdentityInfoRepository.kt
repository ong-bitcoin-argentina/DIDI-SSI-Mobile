package com.app.dportlandia.repository

import android.content.Context

class IdentityInfoRepository(
    context: Context
) {
    private val sharedPreferences = context.getSharedPreferences("com.didiapp.dportlandia.identity", Context.MODE_PRIVATE)

    fun get(): Map<String, String> {
        return sharedPreferences.all.mapValues { it.value.toString() }
    }

    fun get(key: String): String? {
        return sharedPreferences.getString(key, null)
    }

    fun set(key: String, value: String) {
        sharedPreferences.edit().putString(key, value).apply()
    }

    fun remove(key: String) {
        sharedPreferences.edit().remove(key)
    }
}