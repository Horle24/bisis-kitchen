import { MenuItem } from "./sheets";

export interface CartItem {
  item: MenuItem;
  qty: number;
}

export interface CustomerDetails {
  name: string;
  phone: string;
  orderType: "delivery" | "pickup" | "dine";
  address: string;
  note: string;
}

export function getCartTotal(cart: Record<string, CartItem>): number {
  return Object.values(cart).reduce(
    (sum, c) => sum + c.item.price * c.qty,
    0
  );
}

export function getCartCount(cart: Record<string, CartItem>): number {
  return Object.values(cart).reduce((sum, c) => sum + c.qty, 0);
}

export function buildWhatsAppMessage(
  cart: Record<string, CartItem>,
  customer: CustomerDetails
): string {
  const items = Object.values(cart).filter(c => c.qty > 0);
  const total = getCartTotal(cart);
  const typeLabel = {
    delivery: "Home Delivery",
    pickup: "Pickup",
    dine: "Dine In",
  }[customer.orderType];

  let msg = `🍽 *NEW ORDER — FoodHub*\n\n`;
  msg += `👤 *Name:* ${customer.name}\n`;
  msg += `📞 *Phone:* ${customer.phone}\n`;
  msg += `🚀 *Order Type:* ${typeLabel}\n`;

  if (customer.orderType === "delivery") {
    msg += `📍 *Address:* ${customer.address}\n`;
  }

  msg += `\n🛒 *Order Details:*\n`;
  items.forEach(c => {
    msg += `• ${c.item.name} x${c.qty} — ₦${(
      c.item.price * c.qty
    ).toLocaleString()}\n`;
  });

  msg += `\n💰 *Total: ₦${total.toLocaleString()}*`;

  if (customer.note) {
    msg += `\n\n📝 *Special Request:* ${customer.note}`;
  }

  msg += `\n\n_Sent from FoodHub website_`;
  return msg;
}

export function sendToWhatsApp(
  cart: Record<string, CartItem>,
  customer: CustomerDetails
): void {
  const msg = buildWhatsAppMessage(cart, customer);
  const url = `https://wa.me/234913864489?text=${encodeURIComponent(msg)}`;
  window.open(url, "_blank");
}