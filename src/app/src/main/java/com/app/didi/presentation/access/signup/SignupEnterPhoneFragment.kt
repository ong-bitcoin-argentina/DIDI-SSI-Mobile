package com.app.didi.presentation.access.signup

import android.os.Bundle
import androidx.lifecycle.ViewModelProviders
import androidx.navigation.fragment.findNavController
import com.app.didi.presentation.common.phoneVerification.CommonEnterPhoneFragment
import javax.inject.Inject

class SignupEnterPhoneFragment
@Inject constructor() : CommonEnterPhoneFragment() {
    lateinit var viewModel: SignupEnterPhoneViewModel

    override fun onActivityCreated(savedInstanceState: Bundle?) {
        super.onActivityCreated(savedInstanceState)
        viewModel = ViewModelProviders.of(this).get(SignupEnterPhoneViewModel::class.java)

        setupObservers(viewModel)
        setupListeners(viewModel)
    }

    override fun onSubmitSuccess() {
        findNavController().navigate(SignupEnterPhoneFragmentDirections.actionSignupEnterPhoneToSignupVerifyPhone())
    }
}
