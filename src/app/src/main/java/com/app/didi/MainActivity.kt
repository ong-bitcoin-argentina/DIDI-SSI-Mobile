package com.app.didi

import android.os.Bundle
import androidx.lifecycle.Observer
import androidx.lifecycle.ViewModelProvider
import androidx.lifecycle.ViewModelProviders
import androidx.navigation.findNavController
import androidx.navigation.ui.AppBarConfiguration
import androidx.navigation.ui.navigateUp
import androidx.navigation.ui.setupActionBarWithNavController
import com.app.didi.presentation.base.BaseActivity
import kotlinx.android.synthetic.main.activity_main.*
import javax.inject.Inject

class MainActivity : BaseActivity() {

    @Inject lateinit var viewModelFactory: ViewModelProvider.Factory

    private lateinit var viewModel: MainViewModel

    private lateinit var appBarConfiguration: AppBarConfiguration

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        viewModel = ViewModelProviders.of(this, viewModelFactory).get(MainViewModel::class.java)

        viewModel.textToShow.observe(this, Observer {
            this.textView.text = it
        })

        viewModel.startUpdating()

        val navController = findNavController(R.id.navHost)
        appBarConfiguration = AppBarConfiguration(navController.graph)
        setupActionBarWithNavController(navController, appBarConfiguration)
    }

    override fun onSupportNavigateUp(): Boolean {
        val navController = findNavController(R.id.navHost)
        return navController.navigateUp(appBarConfiguration) || super.onSupportNavigateUp()
    }
}
