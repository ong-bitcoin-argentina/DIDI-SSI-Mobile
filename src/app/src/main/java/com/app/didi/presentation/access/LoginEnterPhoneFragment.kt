package com.app.didi.presentation.access

import android.os.Bundle
import androidx.lifecycle.ViewModelProviders
import androidx.navigation.fragment.findNavController
import com.app.didi.presentation.common.phoneVerification.CommonEnterPhoneFragment
import javax.inject.Inject

class LoginEnterPhoneFragment
@Inject constructor() : CommonEnterPhoneFragment() {
    lateinit var viewModel: LoginEnterPhoneViewModel

    override fun onActivityCreated(savedInstanceState: Bundle?) {
        super.onActivityCreated(savedInstanceState)
        viewModel = ViewModelProviders.of(this).get(LoginEnterPhoneViewModel::class.java)

        setupObservers(viewModel)
        setupListeners(viewModel)
    }

    override fun onSubmitSuccess() {
        findNavController().navigate(LoginEnterPhoneFragmentDirections.actionLoginEnterPhoneToLoginVerifyPhone())
    }
}
