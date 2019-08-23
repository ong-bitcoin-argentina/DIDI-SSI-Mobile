package com.app.dportlandia

import android.text.Editable
import android.text.TextWatcher
import android.widget.EditText
import android.widget.SimpleCursorAdapter

fun EditText.afterTextChanged(afterTextChanged: (String) -> Unit) {
    this.addTextChangedListener(object : TextWatcher {
        override fun afterTextChanged(editable: Editable?) {
            afterTextChanged.invoke(editable.toString())
        }

        override fun beforeTextChanged(s: CharSequence, start: Int, count: Int, after: Int) {}

        override fun onTextChanged(s: CharSequence, start: Int, before: Int, count: Int) {}
    })
}

sealed class Result<T> {
    override fun toString(): String {
        return when (this) {
            is Success -> "Success: ${this.value}"
            is Failure -> "Failure: ${this.value}"
        }
    }
}

data class Success<T>(
    val value: T
) : Result<T>()

class Failure<T>(
    val value: Exception
) : Result<T>()