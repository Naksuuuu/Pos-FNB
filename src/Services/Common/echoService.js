import Echo from "laravel-echo";
import Pusher from "pusher-js";

window.Pusher = Pusher;

const echoInstance = new Echo({
  broadcaster: "pusher",
  key: import.meta.env.VITE_PUSHER_APP_KEY || "2b0748b7370d3e78e59c",
  cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER || "mt1",
  forceTLS: true,
});

export default echoInstance;
