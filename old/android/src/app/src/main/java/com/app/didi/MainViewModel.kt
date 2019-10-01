package com.app.didi

import androidx.lifecycle.Transformations
import androidx.lifecycle.ViewModel
import javax.inject.Inject

class MainViewModel @Inject constructor(
    private val mainRepository: MainRepository
) : ViewModel() {
    val textToShow = Transformations.map(mainRepository.textToShow) { it }

    fun startUpdating() {
        mainRepository.startUpdating()
    }
}