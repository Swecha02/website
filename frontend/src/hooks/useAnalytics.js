import { trackPageVisit as apiTrackPageVisit, trackButtonClick as apiTrackButtonClick } from '@/lib/api';

export const useAnalytics = () => {
  const trackPageVisit = async (pageName) => {
    apiTrackPageVisit(pageName);
  };

  const trackButtonClick = async (buttonName) => {
    apiTrackButtonClick(buttonName);
  };

  return { trackPageVisit, trackButtonClick };
};
