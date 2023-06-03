import mongoose from 'mongoose';
import { OrderStatus } from '@torressam/common';

// Properties required when building an order
interface OrderAttrs {
  id: string;
  version: number;
  userId: string;
  price: number;
  status: OrderStatus;
}

// List of properties that an order instantiation has (i.e. new Order())
interface OrderDoc extends mongoose.Document {
  version: number;
  userId: string;
  price: number;
  status: OrderStatus;
}

// List of properties that the model itself contains
interface OrderModel extends mongoose.Model<OrderDoc> {
  build(attr: OrderAttrs): OrderDoc;
}

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: Object.values(OrderStatus),
    },
  },
  {
    toJSON: {
      // Delete _id from order response
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

orderSchema.statics.build = (attrs: OrderAttrs) => {
  return new Order({
    _id: attrs.id,
    version: attrs.version,
    price: attrs.price,
    userId: attrs.userId,
    status: attrs.status,
  });
};

// Init schema from above for model to be imported
const Order = mongoose.model<OrderDoc, OrderModel>('Order', orderSchema);

export default Order;
