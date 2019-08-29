package com.app.didi.di.base

import javax.inject.Qualifier

//@Qualifier is used to distinguish between objects of the same type but with different instances.
// In the above codeError, we have ActivityContext and ApplicationContext so that the Context object
//being injected can refer to the respectiveContext type

// A retention policy determines at what point an annotation is discarded.
// RUNTIME is stored in the .class file and is available through the JVM during run start.

@Qualifier
@Retention(AnnotationRetention.RUNTIME)
annotation class ApplicationContext