package com.app.didi.presentation.access

import android.content.Context
import android.content.Intent
import android.os.Bundle
import androidx.navigation.findNavController
import androidx.navigation.ui.AppBarConfiguration
import androidx.navigation.ui.navigateUp
import androidx.navigation.ui.setupActionBarWithNavController
import com.app.didi.R
import com.app.didi.presentation.base.BaseActivity
import kotlinx.android.synthetic.main.activity_access.*

class AccessActivity : BaseActivity() {

    companion object {
        fun newInstance(context: Context): Intent {
            return Intent(context, AccessActivity::class.java)
        }
    }

    private lateinit var appBarConfiguration: AppBarConfiguration

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_access)
        setSupportActionBar(toolbar)

        val navController = findNavController(R.id.navHost)
        appBarConfiguration = AppBarConfiguration(navController.graph)
        setupActionBarWithNavController(navController, appBarConfiguration)
    }

    override fun onSupportNavigateUp(): Boolean {
        val navController = findNavController(R.id.navHost)
        return navController.navigateUp(appBarConfiguration) || super.onSupportNavigateUp()
    }
}
