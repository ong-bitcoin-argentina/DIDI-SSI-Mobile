package com.app.dportlandia.presentation


import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ArrayAdapter
import androidx.fragment.app.Fragment
import com.app.dportlandia.R
import com.app.dportlandia.repository.VerifiedClaimRepository
import kotlinx.android.synthetic.main.fragment_verified_claim_list.*

/**
 * A simple [Fragment] subclass.
 */
class VerifiedClaimListFragment : Fragment() {

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        // Inflate the layout for this fragment
        return inflater.inflate(R.layout.fragment_verified_claim_list, container, false)
    }

    override fun onActivityCreated(savedInstanceState: Bundle?) {
        super.onActivityCreated(savedInstanceState)

        val claims = VerifiedClaimRepository(activity!!).get()

        val adapter = ArrayAdapter(activity, android.R.layout.simple_list_item_1, claims)

        item_list.adapter = adapter

        /* TODO: Claim detail (Is this necessary?)
        item_list.setOnItemClickListener { _, _, position, _ ->
            itemSelected(position)
        }
        */
    }
}
