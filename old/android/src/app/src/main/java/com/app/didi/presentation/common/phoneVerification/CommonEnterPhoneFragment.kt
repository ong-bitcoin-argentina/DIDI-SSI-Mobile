package com.app.didi.presentation.common.phoneVerification

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.databinding.DataBindingUtil
import androidx.lifecycle.Observer
import com.app.didi.R
import com.app.didi.databinding.CommonEnterPhoneFragmentBinding
import com.app.didi.presentation.base.BaseFragment
import com.app.didi.util.afterTextChanged

abstract class CommonEnterPhoneFragment : BaseFragment() {

    private lateinit var viewBinding: CommonEnterPhoneFragmentBinding

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        viewBinding = DataBindingUtil.inflate(inflater, R.layout.common_enter_phone_fragment, container, false)
        return viewBinding.root
    }

    protected fun setupObservers(viewModel: CommonEnterPhoneViewModel<*>) {
        viewModel.canSubmit.observe(this, Observer {
            // TODO: Implement
        })

        viewModel.hasRequestInProgress.observe(this, Observer {
            // TODO: Implement
        })

        viewModel.requestResult.observe(this, Observer {
            onSubmitSuccess()
        })
    }

    protected fun setupListeners(viewModel: CommonEnterPhoneViewModel<*>) {
        viewBinding.phoneEditText.afterTextChanged {
            viewModel.onInputChange(it)
        }

        viewBinding.submitButton.setOnClickListener {
            viewModel.submit(viewBinding.phoneEditText.text.toString())
        }
    }

    protected abstract fun onSubmitSuccess()
}
