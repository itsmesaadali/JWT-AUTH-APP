// lib/utils/loadGoogleScript.ts
export const loadGoogleScript = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (document.getElementById("google-script")) {
      return resolve();
    }
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.id = "google-script";
    script.onload = () => resolve();
    script.onerror = () => reject("Google script failed to load");
    document.body.appendChild(script);
  });
};
