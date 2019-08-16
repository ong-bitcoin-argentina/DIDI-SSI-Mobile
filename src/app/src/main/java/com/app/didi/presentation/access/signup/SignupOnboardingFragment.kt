package com.app.didi.presentation.access.signup

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.annotation.DrawableRes
import androidx.annotation.StringRes
import androidx.databinding.DataBindingUtil
import androidx.fragment.app.Fragment
import androidx.fragment.app.FragmentManager
import androidx.fragment.app.FragmentPagerAdapter
import com.app.didi.R
import com.app.didi.databinding.SignupOnboardingFragmentBinding
import com.app.didi.databinding.SignupOnboardingInfoFragmentBinding
import com.app.didi.util.afterPageChanged

class SignupOnboardingFragment : Fragment() {

    lateinit var viewBinding: SignupOnboardingFragmentBinding

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        viewBinding = DataBindingUtil.inflate(inflater, R.layout.signup_onboarding_fragment, container, false)
        return viewBinding.root
    }

    override fun onActivityCreated(savedInstanceState: Bundle?) {
        super.onActivityCreated(savedInstanceState)

        onPageChange(0)
        setupListeners()
    }

    private fun setupListeners() {
        viewBinding.viewPager.adapter = Adapter(childFragmentManager)

        viewBinding.tabDots.setupWithViewPager(viewBinding.viewPager)

        viewBinding.viewPager.afterPageChanged(this::onPageChange)
    }

    private fun onPageChange(index: Int) {
        viewBinding.layout.setBackgroundResource(infoContent[index].background)
    }

    class Adapter(fm: FragmentManager) : FragmentPagerAdapter(fm, BEHAVIOR_RESUME_ONLY_CURRENT_FRAGMENT) {
        override fun getCount(): Int {
            return 3
        }

        override fun getItem(position: Int): Fragment {
            return InfoFragment(infoContent[position])
        }
    }

    data class InfoContent(
        @DrawableRes val image: Int,
        @StringRes val title: Int,
        @StringRes val description: Int,
        @DrawableRes val background: Int
    )

    class InfoFragment(val content: InfoContent) : Fragment() {
        lateinit var viewBinding: SignupOnboardingInfoFragmentBinding

        override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?): View? {
            viewBinding = DataBindingUtil.inflate(inflater, R.layout.signup_onboarding_info_fragment, container, false)
            return viewBinding.root
        }

        override fun onActivityCreated(savedInstanceState: Bundle?) {
            super.onActivityCreated(savedInstanceState)

            viewBinding.imageView.setImageResource(content.image)
            viewBinding.titleTextView.text =  getString(content.title)
            viewBinding.descriptionTextView.text = getString(content.description)
        }
    }

    companion object {
        val infoContent = listOf(
            InfoContent(
                R.color.onboarding_1,
                R.string.onboarding_title_1,
                R.string.onboarding_description_1,
                R.drawable.bg_onboarding_1
            ),
            InfoContent(
                R.color.onboarding_2,
                R.string.onboarding_title_2,
                R.string.onboarding_description_2,
                R.drawable.bg_onboarding_2
            ),
            InfoContent(
                R.color.onboarding_3,
                R.string.onboarding_title_3,
                R.string.onboarding_description_3,
                R.drawable.bg_onboarding_3
            )
        )
    }
}
