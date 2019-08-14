package com.app.didi.presentation.access

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.databinding.DataBindingUtil
import androidx.fragment.app.Fragment
import com.app.didi.R
import com.app.didi.databinding.StartAccessFragmentBinding
import com.app.didi.util.PendingTasks

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
            PendingTasks.AfterServiceDefinition()
        }

        dataBinding.createAccountButton.setOnClickListener {
            PendingTasks.AfterServiceDefinition()
        }

        dataBinding.recoverAccountButton.setOnClickListener {
            PendingTasks.AfterServiceDefinition()
        }
    }
}
