const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    stripePaymentId: {
      type: String,
      required: true,
    },
    paymentMethod: {
      type: Object,
      required: true,
    },
    products: [
      {
        productId: {
          type: String,
        },
        quantity: {
          type: Number,
          default: 1,
        },
        totalPrice: {
          type: Number,
        },
        image: {
          type: String,
        },
      },
    ],
    amount: { type: Number, required: true },
    address: {
      type: Object,
      required: true,
    },
    status: { type: String, default: 'pending' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', OrderSchema);
