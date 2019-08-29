package com.app.dportlandia.model

import android.content.Context
import com.app.dportlandia.repository.IdentityInfoRepository
import com.app.dportlandia.repository.VerifiedClaimRepository
import me.uport.sdk.credentials.JWTTypes

class SelectiveDisclosureResponse(
    val request: SelectiveDisclosureRequest
) {
    val callback
        get() = request.callback

    fun toPayload(context: Context): Map<String, Any> {
        val result = mutableMapOf<String, Any>(
            "type" to JWTTypes.shareResp.name,
            "aud" to request.issuer,
            "req" to request.original
        )

        val own = mutableMapOf<String, Any>()

        if (request.ownClaims.isNotEmpty() || request.verifiedClaims.isNotEmpty()) {
            val repo = IdentityInfoRepository(context)

            request.ownClaims.forEach { key ->
                repo.get(key)?.let { value ->
                    own[key] = value
                }
            }
            if (own.isNotEmpty()) {
                result["own"] = own
            }
        }

        if (request.verifiedClaims.isNotEmpty()) {
            val verified = mutableListOf<String>()
            val repo = VerifiedClaimRepository(context).get()

            request.verifiedClaims.forEach { selector ->
                repo.find(selector::accepts)?.let { value ->
                    own[selector.name] = value.claims[selector.name]!!
                    verified.add(value.original)
                }
            }
            if (verified.isNotEmpty()) {
                result["verified"] = verified.distinct()
            }
        }

        return result
    }
}