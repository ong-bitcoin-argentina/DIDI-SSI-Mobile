package com.app.dportlandia

import android.content.ClipboardManager
import android.content.Context
import android.text.Editable
import android.text.TextWatcher
import android.widget.EditText
import androidx.core.content.ContextCompat

fun EditText.afterTextChanged(afterTextChanged: (String) -> Unit) {
    this.addTextChangedListener(object : TextWatcher {
        override fun afterTextChanged(editable: Editable?) {
            afterTextChanged.invoke(editable.toString())
        }

        override fun beforeTextChanged(s: CharSequence, start: Int, count: Int, after: Int) {}

        override fun onTextChanged(s: CharSequence, start: Int, before: Int, count: Int) {}
    })
}

fun Context.getClipboardText(): CharSequence? {
    ContextCompat.getSystemService(this, ClipboardManager::class.java)?.primaryClip?.let { clip ->
        if (clip.itemCount > 0) {
            return clip.getItemAt(0).text
        }
    }
    return null
}

sealed class Result<T>

data class Success<T>(
    val value: T
) : Result<T>() {
    override fun toString(): String {
        return value.toString()
    }
}

class Failure<T>(
    val value: Exception
) : Result<T>() {
    override fun toString(): String {
        return "Failure: $value"
    }
}