package com.app.didi.util

sealed class RequestState<T> {
    class Pending<T> : RequestState<T>()

    class Success<T>(val value: T) : RequestState<T>()

    class Failure<T> : RequestState<T>()

    fun value(): T? = when (this) {
        is Pending -> null
        is Failure -> null
        is Success -> value
    }
}
