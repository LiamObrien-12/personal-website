const CHATBASE_API_KEY = process.env.REACT_APP_CHATBASE_API_KEY;

// Track chat analytics
async function trackAnalytics(messageType, messageContent) {
  try {
    await fetch('https://www.chatbase.co/api/v1/analytics', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${CHATBASE_API_KEY}`
      },
      body: JSON.stringify({
        chatId: 'portfolio-assistant',
        type: messageType,
        content: messageContent
      })
    });
  } catch (error) {
    console.error('Analytics Error:', error);
  }
}

// Common fallback responses
const fallbackResponses = {
  greeting: "Hi! I'm Liam's assistant. How can I help you today?",
  projects: "Liam has worked on several interesting projects. Would you like to hear about his latest work?",
  experience: "Liam has experience in software development and engineering. Would you like to know more about a specific area?",
  contact: "You can reach Liam at liam.aobrien1@gmail.com or through his LinkedIn profile.",
  default: "I'm not sure about that. Could you rephrase your question?"
};

export async function getChatResponse(message) {
  try {
    // Track user message
    await trackAnalytics('user_message', message);

    const response = await fetch('https://www.chatbase.co/api/v1/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${CHATBASE_API_KEY}`
      },
      body: JSON.stringify({
        messages: [{
          content: message,
          role: 'user'
        }],
        chatId: 'portfolio-assistant',
        stream: false,
        // Add custom personality
        systemMessage: `You are Liam's friendly and knowledgeable portfolio assistant. 
          You're enthusiastic about technology and always ready to share information 
          about Liam's projects and experience. Keep responses concise and engaging.`
      })
    });

    const data = await response.json();
    
    // Track bot response
    await trackAnalytics('bot_response', data.response);
    
    return data.response;
  } catch (error) {
    console.error('Error:', error);
    // Return appropriate fallback response
    const lowercaseMessage = message.toLowerCase();
    if (lowercaseMessage.includes('hi') || lowercaseMessage.includes('hello')) {
      return fallbackResponses.greeting;
    } else if (lowercaseMessage.includes('project')) {
      return fallbackResponses.projects;
    } else if (lowercaseMessage.includes('experience')) {
      return fallbackResponses.experience;
    } else if (lowercaseMessage.includes('contact')) {
      return fallbackResponses.contact;
    }
    return fallbackResponses.default;
  }
}

// Add feedback system
export async function submitFeedback(messageId, isHelpful) {
  try {
    await fetch('https://www.chatbase.co/api/v1/feedback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${CHATBASE_API_KEY}`
      },
      body: JSON.stringify({
        chatId: 'portfolio-assistant',
        messageId,
        feedback: isHelpful ? 'helpful' : 'not_helpful'
      })
    });
  } catch (error) {
    console.error('Feedback Error:', error);
  }
} 