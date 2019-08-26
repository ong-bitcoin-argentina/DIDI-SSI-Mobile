package com.app.dportlandia.presentation

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ArrayAdapter
import android.widget.Toast
import androidx.databinding.DataBindingUtil
import androidx.fragment.app.Fragment
import androidx.lifecycle.Observer
import androidx.navigation.fragment.findNavController
import com.app.dportlandia.R
import com.app.dportlandia.databinding.HomeFragmentBinding
import me.uport.sdk.Uport

/**
 * Shows links to other screens
 */
class HomeFragment : Fragment() {

    lateinit var viewBinding: HomeFragmentBinding

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        viewBinding = DataBindingUtil.inflate(inflater, R.layout.home_fragment, container, false)
        return viewBinding.root
    }

    private val features = arrayOf(
        "View Own Data",
        "View Verified Claim Data",
        "Disclose Data",
        "Receive Verified Claim",
        "Read JWT"
    )

    override fun onActivityCreated(savedInstanceState: Bundle?) {
        super.onActivityCreated(savedInstanceState)

        (activity as? MainActivity)?.account?.observe(this, Observer {
            viewBinding.accountTextView.text = it.toJson(true)
        })

        val adapter = ArrayAdapter(activity?.baseContext, android.R.layout.simple_list_item_1, features)

        viewBinding.itemList.adapter = adapter

        viewBinding.itemList.setOnItemClickListener { _, _, position, _ ->
            itemSelected(position)
        }
    }

    private fun itemSelected(index: Int) {
        if (Uport.defaultAccount == null) {
            Toast.makeText(activity, "Account Not Yet Available", Toast.LENGTH_LONG).show()
            return
        }

        when (index) {
            0 -> findNavController().navigate(HomeFragmentDirections.viewOwnData())
            1 -> findNavController().navigate(HomeFragmentDirections.viewVerifiedClaims())
            2 -> findNavController().navigate(HomeFragmentDirections.selectiveDisclosure())
            3 -> findNavController().navigate(HomeFragmentDirections.receiveVerifiedClaim())
            4 -> findNavController().navigate(HomeFragmentDirections.readJwt())
            else -> Toast.makeText(activity, "Not Yet Implemented", Toast.LENGTH_LONG).show()
        }
    }
}
