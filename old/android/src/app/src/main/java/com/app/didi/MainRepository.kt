package com.app.didi

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import kotlinx.coroutines.GlobalScope
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch

class MainRepository {
    private val mTextToShow = MutableLiveData<String>().apply { value = "Hello" }

    val textToShow: LiveData<String>
        get() = mTextToShow

    /// A source of constant updates
    fun startUpdating() {
        GlobalScope.launch {
            while (true) {
                delay(1000L)
                mTextToShow.postValue("World")
                delay(1000L)
                mTextToShow.postValue("Hello")
            }
        }
    }
}