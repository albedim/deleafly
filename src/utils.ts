export const BASE_URL = "http://localhost:5000/api/v1"
//export const BASE_URL = "https://deleafly.pythonanywhere.com/api/v1"

export const TEXTS_SCHEMA: any = {
  daily: {
    country: "Viewers nationality of today",
    platform: "Devices used by viewers today",
    views: "Total views of today",
    reviews: "Reviews avarage of today"
  },
  yearly: {
    country: "Viewers nationality of this year",
    platform: "Devices used by viewers this year",
    views: "Total views of this year",
    reviews: "Reviews avarage of this year"
  },
  monthly: {
    country: "Viewers nationality of this month",
    platform: "Devices used by viewers this month",
    views: "Total views of this month",
    reviews: "Reviews avarage of this month"
  },
  weekly: {
    country: "Viewers nationality of this week",
    platform: "Devices used by viewers this week",
    views: "Total views of this week",
    reviews: "Reviews avarage of this week"
  }
}