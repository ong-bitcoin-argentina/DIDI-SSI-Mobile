package com.app.didi.presentation.access.login

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import com.app.didi.presentation.common.phoneVerification.CommonEnterPhoneViewModel
import com.app.didi.util.PendingTasks
import com.app.didi.util.RequestState
import javax.inject.Inject

class LoginEnterPhoneViewModel
@Inject constructor() : CommonEnterPhoneViewModel<PendingTasks.AfterServiceDefinition>() {
    override fun doSubmit(phoneNumber: String): LiveData<RequestState<PendingTasks.AfterServiceDefinition>> {
        return MutableLiveData(RequestState.Success(PendingTasks.AfterServiceDefinition()))
    }
}
