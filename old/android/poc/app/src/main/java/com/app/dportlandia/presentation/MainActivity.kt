package com.app.dportlandia.presentation

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.View
import androidx.lifecycle.MutableLiveData
import androidx.navigation.findNavController
import androidx.navigation.ui.AppBarConfiguration
import androidx.navigation.ui.navigateUp
import androidx.navigation.ui.setupActionBarWithNavController
import com.app.dportlandia.R
import kotlinx.android.synthetic.main.activity_main.*
import kotlinx.coroutines.GlobalScope
import kotlinx.coroutines.launch
import me.uport.sdk.Uport
import me.uport.sdk.core.Networks
import me.uport.sdk.identity.HDAccount

class MainActivity : AppCompatActivity() {

    var account = MutableLiveData<HDAccount>()

    private lateinit var appBarConfiguration: AppBarConfiguration

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        setSupportActionBar(toolbar)

        ensureAccount()

        val navController = findNavController(R.id.navHost)

        appBarConfiguration = AppBarConfiguration(navController.graph)
        setupActionBarWithNavController(navController, appBarConfiguration)

        navController.addOnDestinationChangedListener { _, destination, _ ->
            toolbar.visibility = if (destination.label == null) View.GONE else View.VISIBLE
        }
    }

    override fun onSupportNavigateUp(): Boolean {
        val navController = findNavController(R.id.navHost)
        return navController.navigateUp(appBarConfiguration) || super.onSupportNavigateUp()
    }

    private fun ensureAccount() {
        GlobalScope.launch {
            Uport.defaultAccount = Uport.createAccount(
                Networks.rinkeby.networkId,
                "code item electric juice forget frown figure indoor federal year oven cricket"
            )
            account.postValue(Uport.defaultAccount ?: Uport.createAccount(Networks.rinkeby.networkId))
        }
    }
}
