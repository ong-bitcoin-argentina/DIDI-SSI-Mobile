package com.app.didi.presentation.util

/**
 * Used as a wrapper for data that is exposed via a LiveData that represents an event.
 */
open class Event<out T>(private val content: T) {

    var hasBeenHandled = false
        private set

    fun handleIfNeeded(handler: (T) -> Unit) {
        if (hasBeenHandled) {
            return
        }
        hasBeenHandled = true
        handler(content)
    }

    fun <U> map(fn: (T) -> U): Event<U> {
        val result = Event(fn(content))
        result.hasBeenHandled = hasBeenHandled
        return result
    }
}
