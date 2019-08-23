package com.app.dportlandia

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import androidx.lifecycle.MutableLiveData
import kotlinx.coroutines.GlobalScope
import kotlinx.coroutines.launch
import me.uport.sdk.Uport
import me.uport.sdk.core.Networks
import me.uport.sdk.identity.HDAccount

class MainActivity : AppCompatActivity() {

    var account = MutableLiveData<HDAccount>()
    var name = MutableLiveData<String>()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        ensureAccount()
    }

    private fun ensureAccount() {
        GlobalScope.launch {
            Uport.defaultAccount = Uport.createAccount(Networks.rinkeby.networkId, "code item electric juice forget frown figure indoor federal year oven cricket")
            account.postValue(Uport.defaultAccount ?: Uport.createAccount(Networks.rinkeby.networkId))
        }
    }
}
