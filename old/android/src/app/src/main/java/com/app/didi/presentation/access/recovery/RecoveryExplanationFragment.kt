package com.app.didi.presentation.access.recovery

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.navigation.fragment.findNavController
import com.app.didi.R
import kotlinx.android.synthetic.main.recovery_explanation_fragment.*

class RecoveryExplanationFragment : Fragment() {
    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        return inflater.inflate(R.layout.recovery_explanation_fragment, container, false)
    }

    override fun onActivityCreated(savedInstanceState: Bundle?) {
        super.onActivityCreated(savedInstanceState)

        setupListeners()
    }

    private fun setupListeners() {
        button.setOnClickListener {
            findNavController().navigate(RecoveryExplanationFragmentDirections.actionRecoveryEnterEmail())
        }
    }
}
