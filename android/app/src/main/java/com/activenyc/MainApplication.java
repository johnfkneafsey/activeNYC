package com.activenyc;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.brentvatne.react.ReactVideoPackage;
import com.magus.fblogin.FacebookLoginPackage;
import com.reactnative.photoview.PhotoViewPackage;
import cl.json.RNSharePackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.cboy.rn.splashscreen.SplashScreenReactPackage;
import com.facebook.reactnative.androidsdk.FBSDKPackage;
import com.airbnb.android.react.maps.MapsPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new ReactVideoPackage(),
            new FacebookLoginPackage(),
            new PhotoViewPackage(),
            new RNSharePackage(),
            new LinearGradientPackage(),
            new SplashScreenReactPackage(),
            new FBSDKPackage(),
            new MapsPackage(),
            new VectorIconsPackage()
      );
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
