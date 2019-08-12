package com.app.didi.presentation.signup

import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.Transformations
import com.app.didi.presentation.base.BaseViewModel
import com.app.didi.presentation.common.VerifiedEditTextState
import com.app.didi.util.PendingTasks
import com.app.didi.util.RequestState
import javax.inject.Inject

class EmailSignupViewModel
@Inject constructor() : BaseViewModel() {
    data class State(
        val email: VerifiedEditTextState,
        val password: VerifiedEditTextState,
        val repeatPassword: VerifiedEditTextState
    )

    private val mErrorState = MutableLiveData<State>()
    val errorState
        get() = mErrorState


    private data class RequestArgs(
        val email: String,
        val password: String
    )

    private val signupRequestArgs = MutableLiveData<RequestArgs>()

    private val signupRequest = Transformations.switchMap(signupRequestArgs) {
        MutableLiveData<RequestState<PendingTasks.AfterServiceDefinition>>()
    }

    val signupResult = Transformations.map(signupRequest) {
        it.value()
    }

    val hasRequestInProgress = Transformations.map(signupRequest) {
        it is RequestState.Pending
    }

    fun signup(email: String, password: String) {
        signupRequestArgs.postValue(RequestArgs(email, password))
    }
}