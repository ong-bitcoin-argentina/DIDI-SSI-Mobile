package com.app.dportlandia.presentation


import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.databinding.DataBindingUtil
import androidx.fragment.app.Fragment
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.Observer
import androidx.lifecycle.Transformations
import com.app.dportlandia.R
import com.app.dportlandia.Success
import com.app.dportlandia.afterTextChanged
import com.app.dportlandia.databinding.FragmentReceiveVerifiedClaimBinding
import com.app.dportlandia.getClipboardText
import com.app.dportlandia.model.VerifiedClaim
import com.app.dportlandia.repository.VerifiedClaimRepository

/**
 * Implements the [Verification][https://github.com/uport-project/specs/blob/develop/flows/verification.md]
 * flow
 */
class ReceiveVerifiedClaimFragment : Fragment() {

    private lateinit var viewBinding: FragmentReceiveVerifiedClaimBinding

    private val inputJwt = MutableLiveData<String>()

    private val parsedInputJwt = Transformations.map(inputJwt) {
        if (it.isNullOrBlank()) {
            null
        } else {
            VerifiedClaim.parse(it)
        }
    }

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        viewBinding = DataBindingUtil.inflate(inflater, R.layout.fragment_receive_verified_claim, container, false)
        return viewBinding.root
    }

    override fun onActivityCreated(savedInstanceState: Bundle?) {
        super.onActivityCreated(savedInstanceState)

        viewBinding.responseEditText.afterTextChanged(inputJwt::postValue)

        parsedInputJwt.observe(this, Observer { payload ->
            viewBinding.requestContent.text = payload?.toString()
        })

        viewBinding.pasteButton.setOnClickListener {
            viewBinding.responseEditText.setText(activity?.getClipboardText(), TextView.BufferType.EDITABLE)
        }

        viewBinding.clearButton.setOnClickListener {
            viewBinding.responseEditText.text = null
        }

        viewBinding.acceptButton.setOnClickListener {
            val context = activity
            val claim = (parsedInputJwt.value as? Success)?.value

            if (context != null && claim != null) {
                VerifiedClaimRepository(context).add(claim)
            }
        }
    }
}
