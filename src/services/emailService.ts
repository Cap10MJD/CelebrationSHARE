// Email Service for Customer Support Escalations
// Handles sending support tickets and chat transcripts to the support team

export interface SupportTicket {
  id: string;
  sessionId: string;
  userData: {
    name: string;
    email: string;
    orderId?: string;
    issue?: string;
  };
  chatHistory: any[];
  createdAt: Date;
  priority: 'low' | 'normal' | 'high' | 'urgent';
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  assignedTo?: string;
  notes?: string[];
}

export interface EmailTemplate {
  subject: string;
  body: string;
  htmlBody?: string;
}

// Support ticket storage (in production, this would be a database)
let supportTickets: SupportTicket[] = [];

// Email templates
const emailTemplates = {
  supportTicket: (ticket: SupportTicket): EmailTemplate => ({
    subject: `Support Ticket #${ticket.id} - ${ticket.userData.name}`,
    body: `
New support ticket created:

Ticket ID: ${ticket.id}
User: ${ticket.userData.name}
Email: ${ticket.userData.email}
Order ID: ${ticket.userData.orderId || 'N/A'}
Issue: ${ticket.userData.issue || 'General inquiry'}
Priority: ${ticket.priority}
Created: ${ticket.createdAt.toLocaleString()}

Chat History:
${ticket.chatHistory.map(msg => `[${msg.sender.toUpperCase()}] ${msg.text}`).join('\n')}

Please respond within 1 hour.
    `,
    htmlBody: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb;">New Support Ticket #${ticket.id}</h2>
        
        <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0;">Ticket Details</h3>
          <p><strong>User:</strong> ${ticket.userData.name}</p>
          <p><strong>Email:</strong> ${ticket.userData.email}</p>
          <p><strong>Order ID:</strong> ${ticket.userData.orderId || 'N/A'}</p>
          <p><strong>Issue:</strong> ${ticket.userData.issue || 'General inquiry'}</p>
          <p><strong>Priority:</strong> <span style="color: ${getPriorityColor(ticket.priority)};">${ticket.priority.toUpperCase()}</span></p>
          <p><strong>Created:</strong> ${ticket.createdAt.toLocaleString()}</p>
        </div>
        
        <div style="background: #f1f5f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0;">Chat History</h3>
          ${ticket.chatHistory.map(msg => `
            <div style="margin: 10px 0; padding: 10px; background: white; border-radius: 4px;">
              <strong style="color: ${msg.sender === 'user' ? '#2563eb' : '#059669'};">
                ${msg.sender === 'user' ? '👤 User' : '🤖 AI Assistant'}
              </strong>
              <p style="margin: 5px 0 0 0;">${msg.text}</p>
              <small style="color: #64748b;">${new Date(msg.timestamp).toLocaleString()}</small>
            </div>
          `).join('')}
        </div>
        
        <div style="background: #fef3c7; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <p style="margin: 0; color: #92400e;">
            <strong>⚠️ Action Required:</strong> Please respond to the user within 1 hour.
          </p>
        </div>
        
        <p style="color: #64748b; font-size: 14px;">
          This ticket was automatically generated from the AI chat system.
        </p>
      </div>
    `
  }),
  
  userConfirmation: (ticket: SupportTicket): EmailTemplate => ({
    subject: `Support Ticket #${ticket.id} Received - CelebrationShare`,
    body: `
Dear ${ticket.userData.name},

Thank you for contacting CelebrationShare support. We have received your inquiry and our team will get back to you within 1 hour.

Ticket Details:
- Ticket ID: ${ticket.id}
- Issue: ${ticket.userData.issue || 'General inquiry'}
- Priority: ${ticket.priority}

If you have any additional information to share, please reply to this email.

Best regards,
The CelebrationShare Support Team
    `,
    htmlBody: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #2563eb; margin: 0;">CelebrationShare</h1>
          <p style="color: #64748b; margin: 5px 0;">Your Neighborhood Party Rental Community</p>
        </div>
        
        <div style="background: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h2 style="color: #0369a1; margin-top: 0;">Support Ticket Received</h2>
          <p>Dear ${ticket.userData.name},</p>
          <p>Thank you for contacting CelebrationShare support. We have received your inquiry and our team will get back to you within <strong>1 hour</strong>.</p>
        </div>
        
        <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0;">Ticket Details</h3>
          <p><strong>Ticket ID:</strong> ${ticket.id}</p>
          <p><strong>Issue:</strong> ${ticket.userData.issue || 'General inquiry'}</p>
          <p><strong>Priority:</strong> ${ticket.priority}</p>
          <p><strong>Created:</strong> ${ticket.createdAt.toLocaleString()}</p>
        </div>
        
        <div style="background: #fef3c7; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <p style="margin: 0; color: #92400e;">
            <strong>💡 Tip:</strong> If you have any additional information to share, please reply to this email.
          </p>
        </div>
        
        <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
          <p style="color: #64748b; margin: 0;">
            Best regards,<br>
            <strong>The CelebrationShare Support Team</strong>
          </p>
        </div>
      </div>
    `
  })
};

// Helper function to get priority color
const getPriorityColor = (priority: string): string => {
  switch (priority) {
    case 'urgent': return '#dc2626';
    case 'high': return '#ea580c';
    case 'normal': return '#2563eb';
    case 'low': return '#059669';
    default: return '#64748b';
  }
};

// Create a new support ticket
export const createSupportTicket = async (
  sessionId: string,
  userData: SupportTicket['userData'],
  chatHistory: any[]
): Promise<SupportTicket> => {
  const ticket: SupportTicket = {
    id: `TICKET_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    sessionId,
    userData,
    chatHistory,
    createdAt: new Date(),
    priority: determinePriority(userData.issue || ''),
    status: 'open',
    notes: []
  };

  supportTickets.push(ticket);

  // Send emails (in production, this would use a real email service)
  await sendSupportTicketEmail(ticket);
  await sendUserConfirmationEmail(ticket);

  return ticket;
};

// Determine ticket priority based on issue
const determinePriority = (issue: string): SupportTicket['priority'] => {
  const lowerIssue = issue.toLowerCase();
  
  if (lowerIssue.includes('urgent') || lowerIssue.includes('emergency') || lowerIssue.includes('broken')) {
    return 'urgent';
  }
  
  if (lowerIssue.includes('payment') || lowerIssue.includes('refund') || lowerIssue.includes('dispute')) {
    return 'high';
  }
  
  if (lowerIssue.includes('technical') || lowerIssue.includes('login') || lowerIssue.includes('error')) {
    return 'normal';
  }
  
  return 'low';
};

// Send support ticket email to support team
const sendSupportTicketEmail = async (ticket: SupportTicket): Promise<void> => {
  const template = emailTemplates.supportTicket(ticket);
  
  // In production, this would use a real email service like SendGrid, Mailgun, etc.
  console.log('Sending support ticket email:', {
    to: 'support@celebration-share.com',
    subject: template.subject,
    body: template.body
  });
  
  // Simulate email sending delay
  await new Promise(resolve => setTimeout(resolve, 1000));
};

// Send confirmation email to user
const sendUserConfirmationEmail = async (ticket: SupportTicket): Promise<void> => {
  const template = emailTemplates.userConfirmation(ticket);
  
  // In production, this would use a real email service
  console.log('Sending user confirmation email:', {
    to: ticket.userData.email,
    subject: template.subject,
    body: template.body
  });
  
  // Simulate email sending delay
  await new Promise(resolve => setTimeout(resolve, 1000));
};

// Get all support tickets (for admin panel)
export const getAllSupportTickets = (): SupportTicket[] => {
  return supportTickets.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
};

// Get support ticket by ID
export const getSupportTicket = (id: string): SupportTicket | undefined => {
  return supportTickets.find(ticket => ticket.id === id);
};

// Update support ticket status
export const updateSupportTicketStatus = (id: string, status: SupportTicket['status'], notes?: string): boolean => {
  const ticket = supportTickets.find(t => t.id === id);
  if (ticket) {
    ticket.status = status;
    if (notes) {
      ticket.notes = ticket.notes || [];
      ticket.notes.push(`${new Date().toLocaleString()}: ${notes}`);
    }
    return true;
  }
  return false;
};

// Assign support ticket
export const assignSupportTicket = (id: string, assignedTo: string): boolean => {
  const ticket = supportTickets.find(t => t.id === id);
  if (ticket) {
    ticket.assignedTo = assignedTo;
    return true;
  }
  return false;
};

// Get support ticket statistics
export const getSupportTicketStats = () => {
  const total = supportTickets.length;
  const open = supportTickets.filter(t => t.status === 'open').length;
  const inProgress = supportTickets.filter(t => t.status === 'in_progress').length;
  const resolved = supportTickets.filter(t => t.status === 'resolved').length;
  const closed = supportTickets.filter(t => t.status === 'closed').length;
  
  const avgResponseTime = calculateAverageResponseTime();
  
  return {
    total,
    open,
    inProgress,
    resolved,
    closed,
    avgResponseTime,
    priorityBreakdown: {
      urgent: supportTickets.filter(t => t.priority === 'urgent').length,
      high: supportTickets.filter(t => t.priority === 'high').length,
      normal: supportTickets.filter(t => t.priority === 'normal').length,
      low: supportTickets.filter(t => t.priority === 'low').length
    }
  };
};

// Calculate average response time (simplified)
const calculateAverageResponseTime = (): string => {
  // In a real implementation, this would calculate actual response times
  return '2.5 hours';
}; 