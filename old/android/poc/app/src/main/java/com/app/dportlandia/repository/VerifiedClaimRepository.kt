package com.app.dportlandia.repository

import android.content.Context
import com.app.dportlandia.Success
import com.app.dportlandia.model.VerifiedClaim

class VerifiedClaimRepository(
    context: Context
) {
    private val sharedPreferences = context.getSharedPreferences("com.didiapp.dportlandia.verified_claims", Context.MODE_PRIVATE)

    fun get(): List<VerifiedClaim> {
        return sharedPreferences.all.keys
            .map { VerifiedClaim.parse(it) }
            .mapNotNull { (it as? Success)?.value }
    }

    fun add(claim: VerifiedClaim) {
        sharedPreferences.edit().putInt(claim.original, 1).apply()
    }

    fun remove(claim: VerifiedClaim) {
        sharedPreferences.edit().remove(claim.original).apply()
    }
}