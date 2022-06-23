export const OrderStatus = {
  REJECTED: 'rejected',
  INCOMING: 'incoming',
  ACCEPTED: 'accepted',
  READY: 'ready',
  COLLECTED: 'collected',
};

export const CurrentOrderStatuses = [
  OrderStatus.READY,
  OrderStatus.ACCEPTED,
  OrderStatus.INCOMING,
];

export const PastOrderStatuses = [OrderStatus.COLLECTED, OrderStatus.REJECTED];
