import { useMemo } from "react";
import { useOrders } from "../context/ordersContext";

export const useGetOrderStats = () => {
  const { orders } = useOrders();

  const orderStats = useMemo(() => {
    // Count orders by status
    const totalOrders = orders.length;
    const completedOrders = orders.filter(
      (order) => order.status === "completed"
    ).length;
    const pendingOrders = orders.filter(
      (order) => order.status === "pending"
    ).length;
    const processingOrders = orders.filter(
      (order) => order.status === "processing"
    ).length;

    const completionRate =
      totalOrders > 0 ? Math.round((completedOrders / totalOrders) * 100) : 0;

    // Calculate payment method distribution
    const paymentMethods = {};
    orders.forEach((order) => {
      if (!paymentMethods[order.paymentMethod]) {
        paymentMethods[order.paymentMethod] = 0;
      }
      paymentMethods[order.paymentMethod]++;
    });

    const paymentMethodDistribution = Object.entries(paymentMethods).map(
      ([name, value]) => ({
        name: name.replace("_", " ").replace(/\b\w/g, (l) => l.toUpperCase()),
        value,
      })
    );

    // Calculate delivery method distribution
    const deliveryMethods = {};
    orders.forEach((order) => {
      if (!deliveryMethods[order.deliveryMethod]) {
        deliveryMethods[order.deliveryMethod] = 0;
      }
      deliveryMethods[order.deliveryMethod]++;
    });

    const deliveryMethodDistribution = Object.entries(deliveryMethods).map(
      ([name, value]) => ({
        name: name.replace("_", " ").replace(/\b\w/g, (l) => l.toUpperCase()),
        value,
      })
    );

    return {
      totalOrders,
      completedOrders,
      pendingOrders,
      processingOrders,
      completionRate,
      paymentMethodDistribution,
      deliveryMethodDistribution,
    };
  }, [orders]);

  return orderStats;
};
