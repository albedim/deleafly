//export const BASE_URL = "http://localhost:5000/api/v1"
export const BASE_URL = "https://deleafly.pythonanywhere.com/api/v1"

export const TEXTS_SCHEMA: any = {
  daily: {
    country: "Where your viewers are coming from today:",
    platform: "What device your viewers are using today:",
    views: "Total views of today"
  },
  monthly: {
    country: "Where your viewers've come from in the last 12 months:",
    platform: "What device your viewers've used in the last 12 months:",
    views: "Total views of the last 12 months"
  },
  weekly: {
    country: "Where your viewers are coming from this week:",
    platform: "What device your viewers are using this week:",
    views: "Total views of this week"
  }
}