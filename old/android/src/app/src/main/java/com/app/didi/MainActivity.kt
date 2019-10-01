package com.app.didi

import android.os.Bundle
import androidx.lifecycle.Observer
import androidx.lifecycle.ViewModelProvider
import androidx.lifecycle.ViewModelProviders
import com.app.didi.presentation.access.AccessActivity
import com.app.didi.presentation.base.BaseActivity
import kotlinx.android.synthetic.main.activity_main.*
import javax.inject.Inject

class MainActivity : BaseActivity() {

    @Inject lateinit var viewModelFactory: ViewModelProvider.Factory

    private lateinit var viewModel: MainViewModel

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        if (true) {
            val intent = AccessActivity.newInstance(this)
            startActivity(intent)
            finish()
            return
        }

        setContentView(R.layout.activity_main)

        viewModel = ViewModelProviders.of(this, viewModelFactory).get(MainViewModel::class.java)

        viewModel.textToShow.observe(this, Observer {
            this.textView.text = it
        })

        viewModel.startUpdating()
    }
}
