import firebaseAnalytics from '@react-native-firebase/analytics';
import { Mixpanel } from 'mixpanel-react-native';

class Metrics {
  private mixpanel: Mixpanel;

  constructor() {
    this.mixpanel = new Mixpanel('c6df0eefad2141ce35166fea9009346a', true);
    this.mixpanel.init();
  }

  logEvent(eventName: string, payload?: Record<string, string | number>) {
    return Promise.all([
      firebaseAnalytics().logEvent(eventName, payload),
      this.mixpanel.track(eventName, payload),
    ]);
  }

  setCurrentScreen(
    screenName: string,
    payload?: Record<string, string | number>
  ) {
    return this.logEvent('NAVIGATED', { screenName, ...payload });
  }
}

export default new Metrics();
