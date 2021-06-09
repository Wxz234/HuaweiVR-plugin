LOCAL_PATH := $(call my-dir)

#---------------------------------------------------------------------------------------------
include $(CLEAR_VARS)
LOCAL_MODULE := xr_loader
LOCAL_SRC_FILES := $(LOCAL_PATH)/$(TARGET_ARCH_ABI)/libxr_loader.so
include $(PREBUILT_SHARED_LIBRARY)
#---------------------------------------------------------------------------------------------

include $(CLEAR_VARS)
LOCAL_MODULE    := xrdemo

LOCAL_C_INCLUDES := \
        $(LOCAL_PATH)/openxr \
        $(LOCAL_PATH)

LOCAL_ARM_MODE  := arm                  # full speed arm instead of thumb
LOCAL_ARM_NEON  := true                 # compile with neon support enabled

LOCAL_SRC_FILES := xr_demo.cpp \
                   model.cpp \
                   texture.cpp \
                   gl_function_ext.cpp \
                   egl_environment.cpp


LOCAL_LDLIBS    := -lGLESv2             # OpenGL ES 3.0
LOCAL_LDLIBS    += -lEGL                # GL platform interface
LOCAL_LDLIBS    += -lm -llog            # logging
LOCAL_LDLIBS    += -landroid            # native windows
LOCAL_LDLIBS    += -lOpenMAXAL          # native multimedia
LOCAL_LDLIBS    += -lz                  # For minizip
LOCAL_LDLIBS    += -lOpenSLES           # audio


LOCAL_SHARED_LIBRARIES := xr_loader


include $(BUILD_SHARED_LIBRARY)         # start building based on everything since CLEAR_VARS
#---------------------------------------------------------------------------------------------

