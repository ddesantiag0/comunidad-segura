import emailjs from '@emailjs/browser';

export interface NotificationData {
  title: string;
  body: string;
  icon?: string;
  tag?: string;
}

export const sendBrowserNotification = (data: NotificationData) => {
  if (!('Notification' in window)) {
    console.log('Browser does not support notifications');
    return false;
  }

  if (Notification.permission === 'granted') {
    const notification = new Notification(data.title, {
      body: data.body,
      icon: data.icon || '/favicon.ico',
      tag: data.tag || 'emergency-alert',
      requireInteraction: true,
    });
    
    // Add click handler to focus the window
    notification.onclick = () => {
      window.focus();
      notification.close();
    };
    
    return true;
  } else if (Notification.permission === 'default') {
    Notification.requestPermission().then(permission => {
      if (permission === 'granted') {
        const notification = new Notification(data.title, {
          body: data.body,
          icon: data.icon || '/favicon.ico',
          tag: data.tag || 'emergency-alert',
          requireInteraction: true,
        });
        
        notification.onclick = () => {
          window.focus();
          notification.close();
        };
      }
    });
  }
  return false;
};

export const sendEmergencyEmails = async (contacts: Array<{name: string; phone: string; email?: string}>, userLocation?: string) => {
  // EmailJS configuration with your actual credentials
  const SERVICE_ID = 'service_k9w1vq5'; // Your actual service ID
  const TEMPLATE_ID = 'template_r9g0kxl'; // Your actual template ID from EmailJS
  const PUBLIC_KEY = 'VyWWfwtzPPiYSaxTd'; // Your actual public key

  const emailPromises = contacts
    .filter(contact => contact.email) // Only send to contacts with email addresses
    .map(async (contact) => {
      try {
        const templateParams = {
          to_name: contact.name,
          to_email: contact.email,
          from_name: 'Comunidad Segura',
          from_email: 'comunidadsegura25@gmail.com',
          subject: '🚨 EMERGENCY ALERT - Immediate Assistance Needed',
          message: `EMERGENCY ALERT

Your emergency contact has activated an emergency alert and may need immediate assistance.

Contact Details:
- Name: ${contact.name}
- Phone: ${contact.phone}
- Time: ${new Date().toLocaleString()}
${userLocation ? `- Location: ${userLocation}` : ''}

Please contact them immediately or call emergency services if needed.

This is an automated emergency notification from Comunidad Segura.`,
        };

        await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);
        console.log(`Emergency email sent successfully to ${contact.name} (${contact.email})`);
        return true;
      } catch (error) {
        console.error(`Failed to send email to ${contact.name}:`, error);
        return false;
      }
    });

  const results = await Promise.allSettled(emailPromises);
  const successCount = results.filter(result => result.status === 'fulfilled' && result.value).length;
  
  return successCount;
};

export const sendEmergencyNotifications = async (contacts: Array<{name: string; phone: string; email?: string}>) => {
  const contactsWithPhone = contacts.filter(c => c.phone.trim());
  const contactSummary = contactsWithPhone.map(c => `${c.name}: ${c.phone}`).join(', ');
  
  // Send enhanced browser notification with phone numbers
  sendBrowserNotification({
    title: '🚨 Emergency Alert Sent',
    body: `Alert sent to ${contacts.length} contacts. Call immediately: ${contactSummary}. Emails also sent to available addresses.`,
    tag: 'emergency-sent'
  });

  // Send emergency emails
  const emailsSent = await sendEmergencyEmails(contacts);
  
  console.log('Emergency contacts to notify:', contacts);
  console.log(`Successfully sent ${emailsSent} emergency emails`);
  
  return { totalContacts: contacts.length, emailsSent, phoneContacts: contactsWithPhone };
};
