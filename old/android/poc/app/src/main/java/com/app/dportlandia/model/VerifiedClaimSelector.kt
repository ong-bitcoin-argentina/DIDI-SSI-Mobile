package com.app.dportlandia.model

class VerifiedClaimSelector(
    val name: String,
    val issuer: String?
) {
    fun accepts(claim: VerifiedClaim): Boolean {
        return claim.claims.contains(name) && (issuer == null || issuer == claim.issuer)
    }

    override fun toString(): String {
        if (issuer != null) {
            return "VerifiedClaimSelector(name=\"$name\", issuer=\"$issuer\")"
        } else {
            return name
        }
    }
}