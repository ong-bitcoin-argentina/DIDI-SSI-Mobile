package com.app.didi.presentation.common

import androidx.annotation.StringRes

sealed class VerifiedEditTextState {
    object Unknown : VerifiedEditTextState()

    object Valid : VerifiedEditTextState()

    class Invalid(@StringRes errorMessage: Int) : VerifiedEditTextState()
}