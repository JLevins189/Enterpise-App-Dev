import axiosInstance from "./axiosInstance";
const apiUrl = "/api/countries";

export function getCapitalCitiesRequest() {
  return axiosInstance.get(`${apiUrl}/capital-city`);
}
export function getCoastlineRequest() {
  return axiosInstance.get(`${apiUrl}/coastline`);
}
export function getContinentRequest() {
  return axiosInstance.get(`${apiUrl}/continent`);
}
export function getCurrencyNameRequest() {
  return axiosInstance.get(`${apiUrl}/currency-name`);
}
export function getDomainRequest() {
  return axiosInstance.get(`${apiUrl}/domain-tld`);
}
export function getFlagRequest() {
  return axiosInstance.get(`${apiUrl}/flag`);
}
