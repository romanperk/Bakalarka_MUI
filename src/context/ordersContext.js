import React, { createContext, useContext, useState } from "react";

const OrderContext = createContext();

const initialOrders = [
  {
    id: 1,
    userName: "John Doe",
    userEmail: "john@example.com",
    productName: "Headphones",
    quantity: 2,
    paymentMethod: "credit_card",
    deliveryMethod: "express",
    status: "completed",
    createdAt: new Date("2025-03-15T10:30:00"),
  },
  {
    id: 2,
    userName: "Sarah Johnson",
    userEmail: "sarah.j@company.org",
    productName: "Keyboard",
    quantity: 1,
    paymentMethod: "paypal",
    deliveryMethod: "standard",
    status: "processing",
    createdAt: new Date("2025-03-25T16:22:00"),
  },
  {
    id: 3,
    userName: "Miguel Rodriguez",
    userEmail: "mrodriguez@email.net",
    productName: "Smart Watch",
    quantity: 3,
    paymentMethod: "bank_transfer",
    deliveryMethod: "pickup",
    status: "pending",
    createdAt: new Date("2025-03-30T20:10:00"),
  },
  {
    id: 4,
    userName: "Antonio Banderas",
    userEmail: "antonio.banderas@gmail.com",
    productName: "Mouse",
    quantity: 2,
    paymentMethod: "cash",
    deliveryMethod: "express",
    status: "completed",
    createdAt: new Date("2025-04-01T18:19:00"),
  },
];

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState(initialOrders);
  const [nextId, setNextId] = useState(initialOrders.length + 1);

  const addOrder = (newOrder) => {
    const currentDate = new Date();
    const order = {
      ...newOrder,
      id: nextId,
      createdAt: currentDate,
      status: newOrder.status || "pending",
    };

    setOrders([...orders, order]);
    setNextId(nextId + 1);
  };

  const editOrder = (editedOrder) => {
    const updatedOrders = orders.map((order) =>
      order.id === editedOrder.id
        ? {
            ...editedOrder,
          }
        : order
    );
    setOrders(updatedOrders);
  };

  const completeOrder = (orderId) => {
    const updatedOrders = orders.map((order) =>
      order.id === orderId
        ? {
            ...order,
            status: "completed",
          }
        : order
    );
    setOrders(updatedOrders);
  };

  const deleteOrder = (orderId) => {
    setOrders(orders.filter((order) => order.id !== orderId));
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        addOrder,
        editOrder,
        deleteOrder,
        completeOrder,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error("useOrders must be used within an OrderProvider");
  }
  return context;
};
