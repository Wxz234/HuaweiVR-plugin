package com.huawei.hvrsdk.nativedemo;

import android.content.Context;
import android.view.Surface;

public class GL2JNILib {

    /**
     * @param width the current view width
     * @param height the current view height
     */
     public static native void init(int width, int height, int tex,Context act,Surface sf);
     public static native void uninit();
     public static native void nativeDestroy();
     //public static native void step();
     
}
