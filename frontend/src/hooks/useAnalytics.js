import { trackPageVisit as apiTrackPageVisit, trackButtonClick as apiTrackButtonClick } from '@/lib/api';

export const useAnalytics = () => {
  const trackPageVisit = async (pageName, source) => {
    apiTrackPageVisit(pageName, source);
  };

  const trackButtonClick = async (buttonName, source) => {
    apiTrackButtonClick(buttonName, source);
  };

  return { trackPageVisit, trackButtonClick };
};
