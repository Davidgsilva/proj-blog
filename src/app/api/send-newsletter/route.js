import { NextResponse } from 'next/server';
import { db } from '../../../services/firebase';
import { collection, getDocs, query, orderBy, limit, where } from 'firebase/firestore';

// You would need to set up an email service like SendGrid, Mailgun, etc.
// This is a placeholder for the actual email sending logic
async function sendEmail(recipient, subject, html) {
  // In a real implementation, you would use an email service API here
  console.log(`Sending email to ${recipient} with subject: ${subject}`);
  
  // Example with SendGrid (you would need to install @sendgrid/mail)
  // const sgMail = require('@sendgrid/mail');
  // sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  // const msg = {
  //   to: recipient,
  //   from: 'your-verified-sender@example.com',
  //   subject: subject,
  //   html: html,
  // };
  // await sgMail.send(msg);
  
  return true;
}

// Generate HTML content for the email
function generateEmailHtml(story) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
        }
        .header {
          background-color: #6b46c1;
          color: white;
          padding: 20px;
          text-align: center;
        }
        .content {
          padding: 20px;
        }
        .story-title {
          color: #6b46c1;
          font-size: 24px;
          margin-bottom: 10px;
        }
        .story-meta {
          color: #666;
          font-size: 14px;
          margin-bottom: 20px;
        }
        .story-content {
          margin-bottom: 20px;
        }
        .cta-button {
          display: inline-block;
          background-color: #6b46c1;
          color: white;
          padding: 10px 20px;
          text-decoration: none;
          border-radius: 4px;
        }
        .footer {
          margin-top: 30px;
          padding-top: 20px;
          border-top: 1px solid #eee;
          font-size: 12px;
          color: #666;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>Creative Stories Blog</h1>
        <p>Story of the Week</p>
      </div>
      <div class="content">
        <div class="story-title">${story.title}</div>
        <div class="story-meta">By ${story.author} • ${new Date(story.createdAt).toLocaleDateString()}</div>
        
        <div class="story-content">
          ${story.content.substring(0, 500)}${story.content.length > 500 ? '...' : ''}
        </div>
        
        <a href="${process.env.NEXT_PUBLIC_SITE_URL}/story/${story.id}" class="cta-button">Read Full Story</a>
        
        <div class="footer">
          <p>You're receiving this email because you subscribed to our newsletter.</p>
          <p>To unsubscribe, <a href="${process.env.NEXT_PUBLIC_SITE_URL}/unsubscribe">click here</a>.</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

export async function GET(request) {
  try {
    // Get the API key from the query parameters
    const { searchParams } = new URL(request.url);
    const apiKey = searchParams.get('apiKey');
    
    // Validate the API key (use a secure method in production)
    if (apiKey !== process.env.NEWSLETTER_API_KEY) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    // Get the latest story
    const storiesRef = collection(db, 'stories');
    const q = query(storiesRef, orderBy('createdAt', 'desc'), limit(1));
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      return NextResponse.json(
        { success: false, message: 'No stories found' },
        { status: 404 }
      );
    }
    
    // Get the story data
    const storyDoc = querySnapshot.docs[0];
    const story = {
      id: storyDoc.id,
      ...storyDoc.data(),
      createdAt: storyDoc.data().createdAt.toDate().toISOString()
    };
    
    // Get all active subscribers
    const subscribersRef = collection(db, 'subscribers');
    const subscribersQuery = query(
      subscribersRef, 
      where('status', '==', 'active')
    );
    const subscribersSnapshot = await getDocs(subscribersQuery);
    
    const subscribers = [];
    subscribersSnapshot.forEach((doc) => {
      subscribers.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    // Generate email content
    const subject = `Story of the Week: ${story.title}`;
    const htmlContent = generateEmailHtml(story);
    
    // Send emails to all subscribers
    const emailPromises = subscribers.map(subscriber => 
      sendEmail(subscriber.email, subject, htmlContent)
    );
    
    await Promise.all(emailPromises);
    
    return NextResponse.json({
      success: true,
      message: `Newsletter sent to ${subscribers.length} subscribers`,
      storyTitle: story.title,
      subscriberCount: subscribers.length
    });
    
  } catch (error) {
    console.error('Error sending newsletter:', error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
