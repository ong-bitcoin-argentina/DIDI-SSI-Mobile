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
import com.app.dportlandia.afterTextChanged
import com.app.dportlandia.databinding.FragmentReadJwtBinding
import com.app.dportlandia.getClipboardText
import me.uport.sdk.jwt.JWTTools

/**
 * A simple [Fragment] subclass.
 */
class ReadJwtFragment : Fragment() {

    private lateinit var viewBinding: FragmentReadJwtBinding

    private val inputJwt = MutableLiveData<String>()

    private val parsedInputJwt = Transformations.map(inputJwt) {
        if (it.isNullOrBlank()) {
            null
        } else {
            val original = it.substringAfter("req/").substringBefore('?')
            JWTTools().decode(original).second
        }
    }

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        viewBinding = DataBindingUtil.inflate(inflater, R.layout.fragment_read_jwt, container, false)
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
    }
}