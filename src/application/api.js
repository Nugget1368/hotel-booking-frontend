import ReservationsApi from "./ReservationsApi";
import HotelsApi from "./HotelsApi";
import GuestsApi from "./GuestsApi";

export default class Api {}

Object.assign(Api, ReservationsApi, HotelsApi, GuestsApi);
