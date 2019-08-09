package com.app.didi.presentation.di.module

import dagger.Module

/**
 * Aca van los providers de La BD, DAOs, RestApi, etc.
 * Dos formas de declarar proveedores de contenido:
 * - @Provides: Se usa cuando necesitas crear la instancia del objeto a mano.</li>
 * - @Binds: Se define un metodo abstracto y dagger se encarga de implementarlo, basicamente se delega la tarea a dagger.</li>
 */
@Module(includes = [ViewModelModule::class])
class AppModule {
}
