export const productConfig = {
  productId: "5ce6656279ca7a1c4364a859",

  deliveryMethod: {
    name: "Daily",

    type: "age",

    metric: "years",

    description: "Kindly imput your age"
  },

  deliveryTime: "14:00",

  sources: {
    sms: {
      type: "default",

      url: "https://google.com/fetch"
    },

    ussd: {
      type: "content api",

      url: "https://google.com/fetch"
    },

    ivr: {
      type: "default",

      signalingGatewayIp: "1.1.1.1",

      mediaGatewayIp: "0.1.2.3"
    },

    web: {
      type: "default",

      url: "https://google.com/fetch"
    }
  }
};
