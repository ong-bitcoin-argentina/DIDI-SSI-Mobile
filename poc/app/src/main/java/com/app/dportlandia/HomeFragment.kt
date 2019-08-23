package com.app.dportlandia

import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ArrayAdapter
import android.widget.Toast
import androidx.lifecycle.Observer
import androidx.navigation.fragment.findNavController
import kotlinx.android.synthetic.main.home_fragment.*

/**
 * Shows links to other screens
 */
class HomeFragment : Fragment() {

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        // Inflate the layout for this fragment
        return inflater.inflate(R.layout.home_fragment, container, false)
    }

    private val features = arrayOf(
        "Disclose Data",
        "Receive Claim"
    )

    override fun onActivityCreated(savedInstanceState: Bundle?) {
        super.onActivityCreated(savedInstanceState)

        (activity as? MainActivity)?.account?.observe(this, Observer {
            accountTextView.text = it.toJson(true)
        })

        nameEditText.afterTextChanged {
            (activity as? MainActivity)?.name?.postValue(it)
        }

        val adapter = ArrayAdapter(activity?.baseContext, android.R.layout.simple_list_item_1, features)

        item_list.adapter = adapter

        item_list.setOnItemClickListener { _, _, position, _ ->
            itemSelected(position)
        }
    }

    private fun itemSelected(index: Int) {
        when (index) {
            0 -> findNavController().navigate(HomeFragmentDirections.selectiveDisclosure())
            1 -> findNavController().navigate(HomeFragmentDirections.receiveVerifiedClaim())
            else -> Toast.makeText(activity, "Not Yet Implemented", Toast.LENGTH_LONG).show()
        }
    }
}
