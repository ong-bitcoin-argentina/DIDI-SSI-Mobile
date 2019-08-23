package com.app.dportlandia

import android.content.ClipboardManager
import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.core.content.ContextCompat
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.Observer
import androidx.lifecycle.Transformations
import com.android.volley.Response
import com.android.volley.toolbox.JsonObjectRequest
import com.android.volley.toolbox.StringRequest
import com.android.volley.toolbox.Volley
import kotlinx.android.synthetic.main.fragment_selective_disclosure.*
import kotlinx.coroutines.GlobalScope
import kotlinx.coroutines.launch
import me.uport.sdk.Uport
import me.uport.sdk.credentials.Credentials
import me.uport.sdk.credentials.JWTTypes
import me.uport.sdk.jwt.JWTTools
import me.uport.sdk.jwt.model.JwtPayload
import org.bouncycastle.crypto.generators.PKCS5S2ParametersGenerator
import org.json.JSONObject

/**
 * Implements the [Selective Disclosure][https://github.com/uport-project/specs/blob/develop/flows/selectivedisclosure.md]
 * flow
 */
class SelectiveDisclosureFragment : Fragment() {

    private val inputJwt = MutableLiveData<String>()

    private val parsedInputJwt = Transformations.map(inputJwt) {
        if (it == null || it.isBlank()) {
            null
        } else {
            try {
                Success(JWTTools().decode(it.substringAfter('/')).second)
            } catch (ex: Exception) {
                Failure<JwtPayload>(ex)
            }
        }
    }

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        // Inflate the layout for this fragment
        return inflater.inflate(R.layout.fragment_selective_disclosure, container, false)
    }

    override fun onActivityCreated(savedInstanceState: Bundle?) {
        super.onActivityCreated(savedInstanceState)

        requestEditText.afterTextChanged(inputJwt::postValue)

        parsedInputJwt.observe(this, Observer { payload ->
            if (payload == null) {
                requestContent.text = null
            } else {
                requestContent.text = payload.toString()
            }
        })

        pasteButton.setOnClickListener {
            activity?.let { activity ->
                ContextCompat.getSystemService(activity, ClipboardManager::class.java)
                    ?.primaryClip?.let { clip ->
                    if (clip.itemCount > 0) {
                        requestEditText.setText(
                            clip.getItemAt(0).text,
                            TextView.BufferType.EDITABLE
                        )
                    }
                }
            }
        }

        clearButton.setOnClickListener {
            requestEditText.text = null
        }

        submitButton.setOnClickListener {
            val activity = this.activity
            val account = Uport.defaultAccount
            val inputJwt = this.inputJwt.value
            val parsedJwt = (this.parsedInputJwt.value as? Success)?.value
            val callback = parsedJwt?.callback

            if (activity != null && account != null && inputJwt != null && parsedJwt != null) {
                val signer = account.getSigner(activity)
                val issuer = "did:ethr:${account.handle}"

                val map = mapOf(
                    "type" to JWTTypes.shareResp.name,
                    "aud" to parsedJwt.iss,
                    "req" to inputJwt.substringAfter('/'),
                    "own" to mapOf(
                        "name" to "Carol Danvers"
                    )/*,
                    "capabilities" to arrayOf(
                        "eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NkstUiJ9.eyJpYXQiOjE1NjY1ODQ4MzksImV4cCI6MTU5ODEyMDgzOSwiYXVkIjoiZGlkOmV0aHI6MHhhYjI1OGExNzI1NmNjZWRiOTIyZDY4MGE1ZGQyMDRiYTZiOTgxZjA5IiwidHlwZSI6Im5vdGlmaWNhdGlvbnMiLCJ2YWx1ZSI6ImFybjphd3M6c25zOnVzLXdlc3QtMjoxMTMxOTYyMTY1NTg6ZW5kcG9pbnQvR0NNL3VQb3J0LzFjNDliMDExLTg3ZGYtM2E3MC1iYTY4LWQzNzVhYzkyNmVkYSIsImlzcyI6ImRpZDpldGhyOjB4NDYwZmVjMjNiZDUzNjEwYmY2ZDBlZDZjNmExYmVmNWVjODZlNzQwZCJ9.QiaRhvsJf6BhU-ev95YMRWX4FjQxMCZ-WFdof86tVKeiz6Dw7wDhA8_hQGv-bUdOgnUZTXTPRbMQTIV2a82lQQA"
                    ),
                    "boxPub" to "vuJUOufcLQTebhWULYgoSSRqBevXSxcCBF/rygA2PGU="
                    */
                )

                GlobalScope.launch {
                    val token = JWTTools().createJWT(map, issuer, signer)
                    //val authenticatedPayload = Credentials(account.getDID(), signer).authenticateDisclosure(token)

                    val queue = Volley.newRequestQueue(activity)
                    val params = mapOf(
                        "access_token" to token
                    )

                    val rq = JsonObjectRequest("${callback}", JSONObject(params), Response.Listener {
                        println("Success: " + it.toString())
                    }, Response.ErrorListener {
                        println("Error: " + it.toString())
                    })
                    queue.add(rq)
                }
            }
        }
    }
}
