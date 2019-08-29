package com.app.didi.presentation.access

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.databinding.DataBindingUtil
import androidx.fragment.app.Fragment
import androidx.navigation.fragment.findNavController
import com.app.didi.R
import com.app.didi.databinding.StartAccessFragmentBinding

class StartAccessFragment : Fragment() {

    private lateinit var dataBinding: StartAccessFragmentBinding

    companion object {
        fun newInstance() = StartAccessFragment()
    }

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        dataBinding = DataBindingUtil.inflate(inflater, R.layout.start_access_fragment, container, false)
        return dataBinding.root
    }

    override fun onActivityCreated(savedInstanceState: Bundle?) {
        super.onActivityCreated(savedInstanceState)
        setupListeners()
    }

    private fun setupListeners() {
        dataBinding.enterButton.setOnClickListener {
            this.findNavController().navigate(StartAccessFragmentDirections.actionStartAccessToLoginEnterPhone())
        }

        dataBinding.createAccountButton.setOnClickListener {
            this.findNavController().navigate(StartAccessFragmentDirections.actionStartAccessToSignupOnboarding())
        }

        dataBinding.recoverAccountButton.setOnClickListener {
            this.findNavController().navigate(StartAccessFragmentDirections.actionStartAccessToRecoveryExplanation())
        }
    }
}
