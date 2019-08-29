package com.app.dportlandia.presentation

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import android.widget.Toast
import androidx.databinding.DataBindingUtil
import androidx.fragment.app.Fragment
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.Observer
import androidx.lifecycle.Transformations
import com.android.volley.Response
import com.android.volley.toolbox.JsonObjectRequest
import com.android.volley.toolbox.Volley
import com.app.dportlandia.R
import com.app.dportlandia.Success
import com.app.dportlandia.afterTextChanged
import com.app.dportlandia.databinding.FragmentSelectiveDisclosureBinding
import com.app.dportlandia.getClipboardText
import com.app.dportlandia.model.SelectiveDisclosureRequest
import com.app.dportlandia.model.SelectiveDisclosureResponse
import kotlinx.android.synthetic.main.fragment_selective_disclosure.*
import kotlinx.coroutines.GlobalScope
import kotlinx.coroutines.launch
import me.uport.sdk.Uport
import me.uport.sdk.identity.HDAccount
import me.uport.sdk.jwt.JWTTools
import org.json.JSONObject

/**
 * Implements the [Selective Disclosure][https://github.com/uport-project/specs/blob/develop/flows/selectivedisclosure.md]
 * flow
 */
class SelectiveDisclosureFragment : Fragment() {

    private lateinit var viewBinding: FragmentSelectiveDisclosureBinding

    private val inputJwt = MutableLiveData<String>()

    private val parsedInputJwt = Transformations.map(inputJwt) {
        if (it == null || it.isBlank()) {
            null
        } else {
            SelectiveDisclosureRequest.parse(it)
        }
    }

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        viewBinding = DataBindingUtil.inflate(inflater, R.layout.fragment_selective_disclosure, container, false)
        return viewBinding.root
    }

    override fun onActivityCreated(savedInstanceState: Bundle?) {
        super.onActivityCreated(savedInstanceState)

        viewBinding.requestEditText.afterTextChanged(inputJwt::postValue)

        parsedInputJwt.observe(this, Observer { payload ->
            viewBinding.requestContent.text = payload?.toString()
        })

        viewBinding.pasteButton.setOnClickListener {
            viewBinding.requestEditText.setText(activity?.getClipboardText(), TextView.BufferType.EDITABLE)
        }

        viewBinding.clearButton.setOnClickListener {
            viewBinding.requestEditText.text = null
        }

        viewBinding.submitButton.setOnClickListener {
            progressBar.visibility = View.VISIBLE

            val activity = this.activity
            val account = Uport.defaultAccount
            val parsedJwt = (this.parsedInputJwt.value as? Success)?.value

            if (activity != null && account != null && parsedJwt != null) {
                val response = SelectiveDisclosureResponse(parsedJwt)
                doResponse(response, account)
            }
        }
    }

    private fun doResponse(response: SelectiveDisclosureResponse, account: HDAccount) {
        val signer = account.getSigner(activity!!)
        val issuer = "did:ethr:${account.handle}"

        GlobalScope.launch {
            val token = JWTTools().createJWT(response.toPayload(activity!!), issuer, signer)
            //val authenticatedPayload = Credentials(account.getDID(), signer).authenticateDisclosure(token)

            val queue = Volley.newRequestQueue(activity)
            val params = mapOf(
                "access_token" to token
            )

            val rq = JsonObjectRequest(response.callback, JSONObject(params), Response.Listener {
                println("Success: $it")
                Toast.makeText(context, "Success: $it", Toast.LENGTH_SHORT).show()
                progressBar.visibility = View.GONE
            }, Response.ErrorListener {
                println("Error: $it")
                Toast.makeText(context, "Error: $it", Toast.LENGTH_SHORT).show()
                progressBar.visibility = View.GONE
            })
            queue.add(rq)
        }
    }
}
