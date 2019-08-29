package com.app.didi.presentation.common.phoneVerification

import android.util.Patterns
import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.Transformations
import com.app.didi.presentation.base.BaseViewModel
import com.app.didi.util.RequestState

abstract class CommonEnterPhoneViewModel<T> : BaseViewModel() {

    val inputPhoneNumber = MutableLiveData<String>()

    val canSubmit = Transformations.map(inputPhoneNumber) {
        Patterns.PHONE.matcher(it).matches()
    }


    private val submitRequestArgs = MutableLiveData<String>()

    private val submitRequest = Transformations.switchMap(submitRequestArgs) {
        doSubmit(it)
    }

    val requestResult = Transformations.map(submitRequest) {
        it.value()
    }

    val hasRequestInProgress = Transformations.map(submitRequest) {
        it is RequestState.Pending
    }

    protected abstract fun doSubmit(phoneNumber: String): LiveData<RequestState<T>>

    fun submit(phoneNumber: String) {
        submitRequestArgs.postValue(phoneNumber)
    }

    fun onInputChange(phoneNumber: String) {
        inputPhoneNumber.postValue(phoneNumber)
    }
}
