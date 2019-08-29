package com.app.dportlandia.model

import com.app.dportlandia.Failure
import com.app.dportlandia.Result
import com.app.dportlandia.Success
import me.uport.sdk.credentials.JWTTypes
import me.uport.sdk.jwt.JWTTools

class SelectiveDisclosureRequest(
    val original: String,
    val issuer: String,
    val callback: String,
    val ownClaims: List<String>,
    val verifiedClaims: List<VerifiedClaimSelector>
) {
    companion object {
        fun parse(token: String): Result<SelectiveDisclosureRequest> {
            try {
                val original = token.substringAfter("req/").substringBefore('?')
                val payload = JWTTools().decode(original).second

                if (payload.type != JWTTypes.shareReq.name) {
                    return Failure(Exception("Wrong token type in Selective Disclosure Request: $payload"))
                }

                val callback = payload.callback
                return if (callback == null) {
                    Failure(Exception("Missing callback in Selective Disclosure Request: $payload"))
                } else {
                    val ownClaims = payload.requested ?: listOf()
                    val verifiedClaims = payload.verified?.map { VerifiedClaimSelector(it, null) } ?: listOf()
                    Success(SelectiveDisclosureRequest(original, payload.iss, callback, ownClaims, verifiedClaims))
                }
            } catch (ex: Exception) {
                return Failure(ex)
            }
        }
    }

    override fun toString(): String {
        return """
            SelectiveDisclosureRequest(
                issuer="$issuer",
                callback="$callback",
                own="$ownClaims",
                verified="$verifiedClaims"
            )
            """.trimIndent()
    }
}