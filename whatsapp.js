// Replace this with the real number later (Format: CountryCodePhoneNumber, no + or spaces)
// Example for Nigeria: "2348012345678"
const WHATSAPP_NUMBER = "2348012345678"; 

export const generateWhatsAppLink = (cartItems, customerInfo) => {
  // 1. Create the header
  let message = `*Hello JustBubu!* 🛍️\nI would like to place an order.\n\n`;
  
  // 2. Add the items
  message += `*--- MY ORDER ---*\n`;
  let total = 0;
  
  cartItems.forEach((item, index) => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;
    message += `${index + 1}. ${item.name} (x${item.quantity}) - ₦${itemTotal.toLocaleString()}\n`;
  });
  
  // 3. Add total and customer details
  message += `\n*Total:* ₦${total.toLocaleString()}\n\n`;
  message += `*--- DELIVERY DETAILS ---*\n`;
  message += `*Name:* ${customerInfo.name}\n`;
  message += `*Address:* ${customerInfo.address}\n`;
  message += `*Preferred Delivery Date:* ${customerInfo.date}\n`;

  // 4. Encode the message for the URL
  const encodedMessage = encodeURIComponent(message);
  
  // 5. Return the WhatsApp link
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
};