package com.app.didi.util

import androidx.viewpager.widget.ViewPager

fun ViewPager.afterPageChanged(afterPageChanged: (Int) -> Unit) {
    addOnPageChangeListener(object : ViewPager.OnPageChangeListener {
        override fun onPageScrollStateChanged(state: Int) {}

        override fun onPageScrolled(position: Int, positionOffset: Float, positionOffsetPixels: Int) {}

        override fun onPageSelected(position: Int) {
            afterPageChanged(position)
        }
    })
}

fun ViewPager.onPageScrolled(onPageScrolled: (page: Int, offset: Float) -> Unit) {
    addOnPageChangeListener(object : ViewPager.OnPageChangeListener {
        override fun onPageScrollStateChanged(state: Int) {}

        override fun onPageScrolled(position: Int, positionOffset: Float, positionOffsetPixels: Int) {
            onPageScrolled(position, positionOffset)
        }

        override fun onPageSelected(position: Int) {}
    })
}