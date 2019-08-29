package com.app.dportlandia.model

import com.app.dportlandia.Failure
import com.app.dportlandia.Result
import com.app.dportlandia.Success
import me.uport.sdk.jwt.JWTTools

class VerifiedClaim(
    val original: String,
    val issuer: String,
    val subject: String,
    val claims: Map<String, Any>
) {
    companion object {
        fun parse(token: String): Result<VerifiedClaim> {
            return try {
                val original = token.substringAfter("req/").substringBefore('?')
                val payload = JWTTools().decode(original).second

                val issuer = payload.iss
                val subject = payload.sub
                val claims = payload.claims

                when {
                    claims == null -> Failure(Exception("Empty Verified Claim: $payload"))
                    subject == null -> Failure(Exception("Empty Subject: $payload"))
                    else -> Success(VerifiedClaim(original, issuer, subject, claims))
                }
            } catch (ex: Exception) {
                Failure(ex)
            }
        }
    }

    override fun toString(): String {
        return """
            VerifiedClaim(
                issuer=$issuer
                subject=$subject
                claims=$claims
            )
        """.trimIndent()
    }
}