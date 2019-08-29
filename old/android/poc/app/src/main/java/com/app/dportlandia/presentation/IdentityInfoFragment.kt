package com.app.dportlandia.presentation


import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.databinding.DataBindingUtil
import androidx.fragment.app.Fragment
import com.app.dportlandia.R
import com.app.dportlandia.databinding.FragmentIdentityInfoBinding
import com.app.dportlandia.repository.IdentityInfoRepository

/**
 * A simple [Fragment] subclass.
 */
class IdentityInfoFragment : Fragment() {

    lateinit var viewBinding: FragmentIdentityInfoBinding

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        viewBinding = DataBindingUtil.inflate(inflater, R.layout.fragment_identity_info, container, false)
        return viewBinding.root
    }

    override fun onActivityCreated(savedInstanceState: Bundle?) {
        super.onActivityCreated(savedInstanceState)

        viewBinding.nameEditText.setText(IdentityInfoRepository(activity!!).get("name"))

        viewBinding.saveButton.setOnClickListener {
            IdentityInfoRepository(activity!!).set("name", viewBinding.nameEditText.text.toString())
        }
    }
}
